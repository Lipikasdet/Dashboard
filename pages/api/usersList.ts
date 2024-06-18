
import type { NextApiRequest, NextApiResponse } from "next";
import { firebase_admin,db } from "./firebaseAdmin";

export default async function getUsersList(req:NextApiRequest,res:NextApiResponse){
    let data:any=[];
 
    
      try{
   const docRef=await db.collection("sdet").doc("employeeDetails");
   const docSnap = await docRef.get();
   if(docSnap.exists){
    data=docSnap.data();
   }
   console.log(data.data)
    res.status(200).json(data.data)
   
      }catch(e){
        console.log(e)
   return res.status(400).json(e)
      }
    }
