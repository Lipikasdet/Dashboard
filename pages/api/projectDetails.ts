import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest,NextApiResponse } from "next";
import { db } from "./firebaseAdmin";
export default async function GetData(req:NextApiRequest,res:NextApiResponse){
    if(req.method=='GET'){
        try{
        db.collection("projects")
  res.status(200).json("data")  
    }catch(error){
        console.error(error)
        res.status(400).json(error)

    }      
}
}