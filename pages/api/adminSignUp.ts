import { NextApiRequest, NextApiResponse } from "next";
import { db, firebase_admin } from "./firebaseAdmin";

export default async function signUpNewUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const { email, displayName, companyName } = body;
  const password = "123456";
  const additionalClaims = { role: "admin", companyName };
  if (req.method == "POST") {
    try {
      const userRecord = await firebase_admin.auth().getUserByEmail(email);
      const uid = userRecord.uid;

      await firebase_admin.auth().setCustomUserClaims(uid, additionalClaims);
      await db
        .collection(email)
        .doc("employeeData")
        .set({ displayName, email, role: "admin", companyName });

      await db
        .collection(companyName)
        .doc("companyDetails")
        .set({ admin: email });
      await db
        .collection(companyName)
        .doc("employeeDetails")
        .set({ data: [{ displayName, email, role: "admin" }] });
      res.status(200).json("Sign Up successfull");
    } catch (e: any) {
      console.log(e);
      res.status(400).json("error while signing up" + e);
    }
  }
}
