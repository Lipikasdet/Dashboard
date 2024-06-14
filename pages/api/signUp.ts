import { NextApiRequest, NextApiResponse } from "next";
import { firebase_admin } from "./firebaseAdmin";

export default async function signUpNewUser(req:NextApiRequest,res:NextApiResponse){
    const body=req.body;
    const email=body.email;

    const displayName=body.displayName;
    const role=body.role;
    const password="123456";
    const additionalClaims={role};

    if(req.method=='POST'){
    try{


     const userData=await firebase_admin.auth().createUser({
        email: email,
        password: password,
        displayName: displayName
      })
      const userUID = await firebase_admin.auth().getUser(userData.uid);
    await firebase_admin.auth().setCustomUserClaims(userData.uid,additionalClaims)
    
        res.status(200).json(userData)

      
    }catch(e:any){
        console.log(e)
        res.status(400).json("error while signing up"+ e)

    }
}
}