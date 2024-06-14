import { NextApiRequest,NextApiResponse } from "next";
import { firebase_admin } from "./firebaseAdmin";
import { getDocs,collection ,setDoc,doc} from "firebase/firestore";

export default async  function Handler(req:NextApiRequest,res:NextApiResponse){
    const database=firebase_admin.firestore();
   if(req.method=="POST"){
    const email=req.body.email;
    const collectionData = await getDocs(collection(database, 'posts'))

    await setDoc(doc(database, "posts",),email)
   }
}