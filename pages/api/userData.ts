import type { NextApiRequest, NextApiResponse } from "next";
import { firebase_admin,db } from "./firebaseAdmin";

export default async function getUsersList(req:NextApiRequest,res:NextApiResponse){
    const {userEmail}=req.query;
    let data:any=[];    
      try{
   const docRef=await db.collection(userEmail).doc("employeeData");
   const docSnap = await docRef.get();
   if(docSnap.exists){
    data=docSnap.data();
   }
    res.status(200).json(data)
  
      }catch(e){
   return res.status(400).json({error:e})
      }
    }