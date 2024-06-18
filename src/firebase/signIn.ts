import { signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "./firebaseAuth";
import axios from "axios";


export default async function signIn(email: string, password: string) {
  try {
    // Perform sign in with email and password
    await signInWithEmailAndPassword(auth, email, password);
    
    // Get the ID token of the currently signed-in user
    const idToken = await auth.currentUser?.getIdToken();

    // Send the ID token to your server to create a session
    const response = await axios.post('/api/session', { idToken });

    // Sign out the user
    await signOut(auth);

    // Return the result (e.g., user role)
    return response.data.role;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error; // Propagate the error to the caller
  }
}

