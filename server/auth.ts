import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import axios from "axios";

dotenv.config();

interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

interface UserParams {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  provider?: string;
}

const privateKey = (process.env.VITE_CHAT_FIREBASE_ADMIN_PRIVATE_KEY || "")
  .split("\\n")
  .join("\n");

const serviceAccount: ServiceAccount = {
  "type": process.env.VITE_CHAT_FIREBASE_ADMIN_TYPE || "",
  "project_id": process.env.VITE_CHAT_FIREBASE_ADMIN_PROJECT_ID || "",
  "private_key_id": process.env.VITE_CHAT_FIREBASE_ADMIN_PRIVATE_KEY_ID || "",
  "private_key": privateKey,
  "client_email": process.env.VITE_CHAT_FIREBASE_ADMIN_CLIENT_EMAIL || "",
  "client_id": process.env.VITE_CHAT_FIREBASE_ADMIN_CLIENT_ID || "",
  "auth_uri": process.env.VITE_CHAT_FIREBASE_ADMIN_AUTH_URI || "",
  "token_uri": process.env.VITE_CHAT_FIREBASE_ADMIN_TOKEN_URI || "",
  "auth_provider_x509_cert_url": process.env.VITE_CHAT_FIREBASE_ADMIN_AUTH_PROVIDER_CERT_URL || "",
  "client_x509_cert_url": process.env.VITE_CHAT_FIREBASE_ADMIN_CLIENT_CERT_URL || "",
};

// Initialize Firebase if not already initialized
if (!admin.apps.length) {
  // admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  // });
}

// API URLs
const requestKakaoMeUrl = "https://kapi.kakao.com/v2/user/me?secure_resource=true";
const requestNaverMeUrl = "https://openapi.naver.com/v1/nid/me";
const requestKakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
const requestNaverTokenUrl = "https://nid.naver.com/oauth2.0/token";

/**
 * createOrFindUser - Create a Firebase user with the given email, or find if exists
 */
async function createOrFindUser(params: UserParams): Promise<admin.auth.UserRecord> {
  try {
    // 신규 사용자 등록
    return await admin.auth().createUser(params);
  } catch (err: any) {
    // 동일한 메일주소로 이미 가입되어 있는 경우에 사용자 검색하여 반환
    if (err.code === "auth/email-already-exists" && params.email) {
      console.log(err);
      return await admin.auth().getUserByEmail(params.email);
    } else {
      throw err;
    }
  }
}

/**
 * updateOrCreateUser - Update Firebase user with the given email, create if none exists
 */
async function updateOrCreateUser(
  userId: string, 
  email: string | null, 
  displayName: string | null, 
  photoURL: string | null, 
  provider: string
): Promise<admin.auth.UserRecord> {
  console.log("updating or creating a firebase user");
  
  const updateParams: UserParams = {
    provider: provider,
  };
  
  if (displayName) {
    updateParams.displayName = displayName;
  } else if (email) {
    updateParams.displayName = email;
  }
  
  if (photoURL) {
    updateParams.photoURL = photoURL;
  }
  
  console.log(updateParams);

  try {
    // 사용자 정보 갱신
    return await admin.auth().updateUser(userId, updateParams);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      updateParams.uid = userId;
      if (email) {
        updateParams.email = email;
      }

      return await createOrFindUser(updateParams);
    }
    throw error;
  }
}

/**
 * Get user profile from Kakao API
 */
async function getKakaoUserProfile(accessToken: string): Promise<admin.auth.UserRecord> {
  console.log("Requesting user profile from Kakao API server.");
  
  const response = await axios.get(requestKakaoMeUrl, {
    headers: { 
      "Authorization": "Bearer " + accessToken 
    }
  });
  
  console.log("RequestMe : ", response.data);
  const body = response.data;
  console.log(body);

  const userId = `kakao:${body.id}`;
  if (!userId) {
    throw new Error("There was no user with the given access token.");
  }
  
  let nickname = null;
  let profileImage = null;
  if (body.properties) {
    nickname = body.properties.nickname;
    profileImage = body.properties.profile_image;
  }
  
  let accountEmail = null;
  if (body.kakao_account) {
    accountEmail = body.kakao_account.email;
    console.log("Email", accountEmail);
  }
  
  return await updateOrCreateUser(
    userId,
    accountEmail,
    nickname,
    profileImage,
    "KAKAO"
  );
}

/**
 * Get user profile from Naver API
 */
async function getNaverUserProfile(accessToken: string): Promise<admin.auth.UserRecord> {
  console.log("Requesting user profile from Naver API server.");
  
  const response = await axios.get(requestNaverMeUrl, {
    headers: { 
      "Authorization": "Bearer " + accessToken 
    }
  });
  
  console.log("RequestMe : ", response.data);
  const body = response.data;
  console.log(body);

  if (body.resultcode === "00") {
    const profile = body.response;
    const userId = `naver:${profile.id}`;
    if (!userId) {
      throw new Error("There was no user with the given access token.");
    }
    
    let displayName = profile.name;
    let profileImage = profile.profile_image;
    let accountEmail = profile.email;
    console.log("Email", accountEmail);

    return await updateOrCreateUser(
      userId,
      accountEmail,
      displayName,
      profileImage,
      "NAVER"
    );
  } else {
    throw new Error("Request Me Failed.");
  }
}

/**
 * createFirebaseToken - returns Firebase token using Firebase Admin SDK
 */
async function createFirebaseToken(provider: string, accessToken: string): Promise<string> {
  try {
    let userRecord: admin.auth.UserRecord;
    
    if (provider === "KAKAO") {
      userRecord = await getKakaoUserProfile(accessToken);
    } else if (provider === "NAVER") {
      userRecord = await getNaverUserProfile(accessToken);
    } else {
      throw new Error("Bad request: Unsupported provider");
    }
    
    const userId = userRecord.uid;
    console.log(`creating a custom firebase token based on uid ${userId}`);
    return await admin.auth().createCustomToken(userId, { provider: provider });
  } catch (error) {
    console.log("Error createFirebaseToken", error);
    throw error;
  }
}

/**
 * Request Kakao access token with authorization code
 */
async function requestKakaoToken(authCode: string): Promise<string> {
  console.log("Requesting user access token from Kakao API server.");

  const response = await axios.post(
    requestKakaoTokenUrl, 
    new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.VITE_CHAT_KAKAO_APP_KEY_REST || "",
      redirect_uri: process.env.KAKAO_APP_REDIRECT_URI || "",
      code: authCode,
    }),
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      }
    }
  );

  console.log(response.data);
  const accessToken = response.data.access_token;
  console.log("Kakao Access Token:", accessToken);
  return accessToken;
}

/**
 * Request Naver access token with authorization code
 */
async function requestNaverToken(authCode: string, state: string): Promise<string> {
  console.log("Requesting user access token from Naver API server.");

  const response = await axios.post(
    requestNaverTokenUrl,
    new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.VITE_CHAT_NAVER_APP_CLIENT_ID || "",
      client_secret: process.env.NAVER_APP_CLIENT_SECRET || "",
      code: authCode,
      state: state,
    }),
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      }
    }
  );

  console.log(response.data);
  const accessToken = response.data.access_token;
  console.log("Naver Access Token:", accessToken);
  return accessToken;
}

// Kakao Authentication Handler
export const kakaoAuth = async (req: Request, res: Response) => {
  try {
    if (req.method === "POST") {
      const authCode = req.body.data?.code;
      console.log("Kakao Auth Code:", authCode);
      
      if (!authCode) {
        return res.status(400).json({
          error: "There is no token.",
          message: "Access token is a required parameter.",
        });
      }

      console.log(`Verifying Kakao Auth Code: ${authCode}`);

      try {
        // Get Kakao access token
        const kakaoToken = await requestKakaoToken(authCode);
        
        // Exchange for Firebase token
        const firebaseToken = await createFirebaseToken("KAKAO", kakaoToken);
        console.log(`Returning firebase token to user: ${firebaseToken}`);

        return res.status(200).json({
          data: {
            kakao_token: kakaoToken,
            firebase_token: firebaseToken,
          },
        });
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          return res.status(error.response.status).json({
            error: {
              status: error.response.status,
              message: error.response.data.error || "Error",
              details: error.response.data.error_description || "Unknown error",
            },
          });
        } else {
          return res.status(500).json({ error: "Error" });
        }
      }
    } else {
      return res.json({});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

// Naver Authentication Handler
export const naverAuth = async (req: Request, res: Response) => {
  try {
    if (req.method === "POST") {
      const authCode = req.body.data?.code;
      console.log("Naver Auth Code:", authCode);
      
      if (!authCode) {
        return res.status(400).json({
          error: "There is no token.",
          message: "Access token is a required parameter.",
        });
      }

      console.log(`Verifying Naver Auth Code: ${authCode}`);

      const state = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);

      try {
        // Get Naver access token
        const naverToken = await requestNaverToken(authCode, state);
        
        // Exchange for Firebase token
        const firebaseToken = await createFirebaseToken("NAVER", naverToken);
        console.log(`Returning firebase token to user: ${firebaseToken}`);

        return res.status(200).json({
          data: {
            naver_token: naverToken,
            firebase_token: firebaseToken,
          },
        });
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          return res.status(error.response.status).json({
            error: {
              status: error.response.status,
              message: error.response.data.error || "Error",
              details: error.response.data.error_description || "Unknown error",
            },
          });
        } else {
          return res.status(500).json({ error: "Error" });
        }
      }
    } else {
      return res.json({});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
}; 