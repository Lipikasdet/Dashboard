import { sendEmailVerification, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "./firebaseAuth";
import axios from "axios";


export default async function signIn(email: string, password: string) {
  // try {
    // Perform sign in with email and password
    await signInWithEmailAndPassword(auth, email, password);
    
    // Get the ID token of the currently signed-in user
    const idToken = await auth.currentUser?.getIdToken();
    const isEmailVerified=auth.currentUser?.emailVerified;
    if(!isEmailVerified){
      await signOut(auth);
      throw new Error("email verification is required")
    }

    // Send the ID token to your server to create a session
    const response = await axios.post('/api/session', { idToken });

    // Sign out the user
    await signOut(auth);

    // Return the result (e.g., user role)
    return response.data.role;
  
}

