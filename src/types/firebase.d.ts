// Define a Firebase User interface that matches what's used in the app
export interface FirebaseUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  emailVerified: boolean;
} 