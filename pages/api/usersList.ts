import type { NextApiRequest, NextApiResponse } from "next";
import { firebase_admin, db } from "./firebaseAdmin";

export default async function getUsersList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { company } = req.query;
  let data: any = [];
  try {
    const docRef = await db.collection(company).doc("employeeDetails");
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      data = docSnap.data();
    }
    res.status(200).json(data.data);
  } catch (e) {
    return res.status(400).json(e);
  }
}
