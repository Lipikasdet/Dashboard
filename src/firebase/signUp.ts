import axios from "axios";
import { auth } from "./firebaseAuth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

interface AdminSignUpData {
  email: string;
  password: string;
  companyName: string;
  displayName: string;
}

interface SignUpResult {
  isSignUpSuccess: boolean;
  error?: any;
}

export async function adminSignUp(
  data: AdminSignUpData
): Promise<SignUpResult> {
  const { email, password, companyName, displayName } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(userCredential,"userCredential")
    console.log(auth.currentUser,"auth.currentUser")
    const uid = user.uid;

    await sendEmailVerification(user);
    await axios.post("/api/adminSignUp", {
      email,
      companyName,
      password,
      displayName,
      uid,
    });
    await signOut(auth);
    console.log(auth.currentUser,"auth.currentUser")
    return { isSignUpSuccess: true };
  } catch (error) {
    console.error("Sign-up error:", error); // Log the error for debugging
    return { isSignUpSuccess: false, error };
  }
}
export async function UserSignUp(data: any) {
  const {
    email,
    displayName,
    role,
    manager,
    managerEmail,
    companyName,
    createdBy: emailOfUser,
  } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      "123456"
    );
    const user = userCredential.user;
    const uid = user.uid;

    await sendEmailVerification(user);
    await axios.post("/api/signUp", {
      email,
      companyName,
      role,
      manager,
      managerEmail,
      createdBy: emailOfUser,
      displayName,
      uid,
    });

    await signOut(auth);

    return { isSignUpSuccess: true };
  } catch (error) {
    console.error("Sign-up error:", error); // Log the error for debugging
    return { isSignUpSuccess: false, error };
  }
}

