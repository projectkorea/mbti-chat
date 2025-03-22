import { saveUser } from "./db.js";
import { authService, functionsService } from "./myBase.js";
import { UserCredential } from "firebase/auth";
import { HttpsCallableResult } from "firebase/functions";

/**
 * Generic function to handle OAuth authentication flow
 */
export const handleOAuthAuthentication = async (
  authCode: string, 
  functionName: string, 
  tokenHandler: (token: string) => void,
  navigate: (path: string) => void
) => {
  try {
    // Call Firebase function to exchange auth code for tokens
    // @ts-expect-error - 타입 추론 문제
    const authFunction = functionsService.httpsCallable(functionName);
    const result = await authFunction({ code: authCode }) as HttpsCallableResult<{
      [key: string]: string;
      firebase_token: string;
    }>;
    
    // Extract tokens from result
    const platformToken = result.data[`${functionName.replace("Auth", "").toLowerCase()}_token`];
    const firebaseToken = result.data.firebase_token;
    
    // Sign in with Firebase custom token
    // @ts-expect-error - 타입 추론 문제
    const userCredential = await authService.signInWithCustomToken(firebaseToken) as UserCredential;
    
    // Handle platform-specific token storage
    if (tokenHandler) {
      tokenHandler(platformToken);
    }
    
    // Save user data if new user
    const user = userCredential.user;
    // Check if new user based on custom property that may exist in your implementation
    interface ExtendedUserCredential extends UserCredential {
      additionalUserInfo?: {
        isNewUser?: boolean;
      };
    }
    const extendedCredential = userCredential as ExtendedUserCredential;
    if (extendedCredential.additionalUserInfo?.isNewUser) {
      saveUser(user);
    }
    
    // Navigate to profile page
    navigate("/profile");
    
    return { success: true };
  } catch (error: unknown) {
    console.error("Authentication error:", error);
    const err = error as { code?: string; message: string; details?: string };
    return { 
      success: false, 
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      } 
    };
  }
}; 