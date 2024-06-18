import { NextApiRequest, NextApiResponse } from "next";
import { db, firebase_admin ,field_Value} from "./firebaseAdmin";

export default async function signUpNewUser(req:NextApiRequest,res:NextApiResponse){
    const body=req.body;
    const {email,displayName,role,projects,manager,managerEmail,companyName,createdBy}=body;  
    const password="123456";
    console.log(role,"roleIn")
    const additionalClaims={role,projects};
    if(req.method=='POST'){
    try{
     const userData=await firebase_admin.auth().createUser({
        email: email,
        password: password,
        displayName: displayName,
      })
      const dataToStore=role=="manager"?{email,displayName,role,projects,teamMembers:[],createdAt:field_Value.serverTimestamp(),companyName,createdBy}:{email,displayName,role,manager,projects,createdAt:field_Value.serverTimestamp(),companyName,createdBy}
    //   const userUID = await firebase_admin.auth().getUser(userData.uid);
    await firebase_admin.auth().setCustomUserClaims(userData.uid,additionalClaims)
    await db.collection(email).doc("employeeData").set(dataToStore)
    if(role!="manager"){
        const managerRef=await db.collection(managerEmail).doc("employeeData")
        await managerRef.update({
            teamMembers:field_Value.arrayUnion({displayName,email})
        })
    }
   
   
    const employeeRef=await db.collection("sdet").doc("employeeDetails")
    await employeeRef.update({
        data:field_Value.arrayUnion({displayName,email,role})
       })

    }catch(e:any){
        console.log(e)
        res.status(400).json("error while signing up"+ e)
    }  
}
}