// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { firebase_admin } from "./firebaseAdmin";
type Data = {
  name: string;
};

export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const uid="HANU8QgcINM3zifjNjwNrBN9gJL2";
  const userRecord=await firebase_admin.auth().getUser(uid);
  const customClaims=userRecord.customClaims;
  console.log(customClaims,"inhello")
  res.status(200).json(customClaims);
}
