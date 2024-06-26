import { NextApiRequest, NextApiResponse } from "next";
import { db, firebase_admin, field_Value } from "./firebaseAdmin";

export default async function signUpNewUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const {
    email,
    displayName,
    role,
    manager,
    managerEmail,
    companyName,
    createdBy,
  } = body;
  const additionalClaims = { role, companyName };
  if (req.method == "POST") {
    try {
      const userRecord = await firebase_admin.auth().getUserByEmail(email);
      const uid = userRecord.uid;
      await firebase_admin.auth().setCustomUserClaims(uid, additionalClaims);

      const dataToStore =
        role == "manager"
          ? {
              email,
              displayName,
              role,
              projects: [],
              teamMembers: [],
              createdAt: field_Value.serverTimestamp(),
              companyName,
              createdBy,
            }
          : {
              email,
              displayName,
              role,
              manager,
              projects: [],
              createdAt: field_Value.serverTimestamp(),
              companyName,
              createdBy,
            };
      await db.collection(email).doc("employeeData").set(dataToStore);
      if (role != "manager") {
        const managerRef = await db
          .collection(managerEmail)
          .doc("employeeData");
        await managerRef.update({
          teamMembers: field_Value.arrayUnion({ displayName, email }),
        });
      }

      const employeeRef = await db.collection(companyName).doc("employeeDetails");
      await employeeRef.update({
        data: field_Value.arrayUnion({ displayName, email, role }),
      });
      res.status(200).json("User created successfully");
    } catch (e: any) {
      console.log(e)
      res.status(400).json("error while signing up" + e);
    }
  }
}
