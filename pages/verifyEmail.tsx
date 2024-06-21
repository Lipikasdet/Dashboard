// pages/verifyEmail.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, applyActionCode } from "firebase/auth";
import  { auth } from "../src/firebase/firebaseAuth"

const VerifyEmail = () => {
  const router = useRouter();
  const { oobCode } = router.query;
  const [message, setMessage] = useState<string>("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      if (oobCode) {
        try {
          await applyActionCode(auth, oobCode as string);
          setMessage("Email verified successfully!");
        } catch (error) {
          console.error("Error verifying email:", error);
          setMessage("Error verifying email.");
        }
      }
    };
    verifyEmail();
  }, [oobCode]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
