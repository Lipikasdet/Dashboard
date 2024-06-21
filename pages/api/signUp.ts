import { NextApiRequest, NextApiResponse } from "next";
import { db, firebase_admin, field_Value } from "./firebaseAdmin";

export default async function signUpNewUser(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  const { email, displayName, role, projects, manager, managerEmail } = body;
  const password = "123456";
  const additionalClaims = { role, projects };

  if (req.method == 'POST') {
    try {
      
      const userData = await firebase_admin.auth().createUser({
        email: email,
        password: password,
        displayName: displayName,
        emailVerified: false,
      });
      console.log(userData)
     
      const actionCodeSettings = {
        url: `http://localhost:3000/verifyEmail`,
        handleCodeInApp: true,
      };
      const emailLink = await firebase_admin.auth().generateEmailVerificationLink(email, actionCodeSettings);
console.log('++++++')
      console.log(`Verification email sent to ${email}: ${emailLink}`);
       await firebase_admin.auth().sendEmailVerification(userData.uid, {
        url: emailLink,
        handleCodeInApp: true
       });
      
      const dataToStore = role === "manager" 
        ? { email, displayName, role, projects, teamMembers: [], createdAt: field_Value.serverTimestamp() }
        : { email, displayName, role, manager, projects, createdAt: field_Value.serverTimestamp() };

    
      await firebase_admin.auth().setCustomUserClaims(userData.uid, additionalClaims);

     
      await db.collection(email).doc("employeeData").set(dataToStore);

      if (role !== "manager") {
        const managerRef = await db.collection(managerEmail).doc("employeeData");
        await managerRef.update({
          teamMembers: field_Value.arrayUnion({ displayName, email })
        });
      }

      const employeeRef = await db.collection("sdet").doc("employeeDetails");
      await employeeRef.update({
        data: field_Value.arrayUnion({ displayName, email, role })
      });

      res.status(200).json({ message: "User registered successfully, verification email sent" });
    } catch (e: any) {
      console.log(e);
      res.status(400).json("error while signing up: " + e);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
