import { firebase_admin } from "./firebaseAdmin";

import { NextApiRequest, NextApiResponse } from "next";
export default async function postData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = firebase_admin.firestore();
  const sessionCookie = req.cookies.sessionCookie;
  const decodedClaims = await firebase_admin
    .auth()
    .verifySessionCookie(sessionCookie, true);
  const isAdmin = decodedClaims.isAdmin === true;
  if (req.method == "GET") {
    try {
      const collectionRef = db.collection("posts");

      const snapshot = await collectionRef.get();
      const data: any = [];
      snapshot.forEach((doc: any) => {
        const documentData = doc.data();
        const documentId = doc.id;

        data.push({ docData: documentData, docRefId: documentId });
      });

      res.status(200).json("data got succesfully");
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }
  if (req.method == "DELETE") {
    const docIdToDelete = JSON.parse(req.body).docRefId;
    console.log(docIdToDelete, "docIdToDelete", isAdmin);
    try {
      if (isAdmin) {
        const docRef = db.collection("posts").doc(docIdToDelete);

        await docRef.delete();

        console.log("Document successfully deleted from Firestore.");
        res.status(200).json("data deleted succesfully");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  if (req.method == "POST") {
    try {
      const docRef = db.collection("data").doc("post3");
      const data = {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 25,
      };
      await docRef.set(data);
      res.status(200).json("data set succesfully");
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }
}
