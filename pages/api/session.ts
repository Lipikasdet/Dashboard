import { NextApiRequest,NextApiResponse } from "next";
import { firebase_admin } from "./firebaseAdmin";
import cookie from "cookie";

export default async  function sessionHandler(req:NextApiRequest,res:NextApiResponse){
    if(req.method=="POST"){
     
 const idToken=(req.body).idToken;
 const expiresIn = 60 * 60 * 24 * 5 * 1000;

 const decodedToken =  await firebase_admin.auth().verifyIdToken(idToken);
 const uid = decodedToken.uid;
 const role=decodedToken.role;
 console.log(decodedToken,"decodedToken")

const timeExpire=new Date(Date.now()+60 * 60 * 24 * 5 * 1000);
 firebase_admin.auth().createSessionCookie(idToken,{expiresIn})
 .then((sessionCookie:any)=>{
   const options = { expires:timeExpire,path:'/' };
    const logInCookie = cookie.serialize('sessionCookie',sessionCookie,options);
    res.setHeader('Set-Cookie',logInCookie);
    res.status(200).json({status:"success",role})
    
 })
 .catch((error:any)=>{
    console.log(error);
    res.status(400).json({status:"unauthorised"});
 }
)


    
}
}