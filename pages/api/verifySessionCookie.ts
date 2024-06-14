import { NextApiRequest,NextApiResponse } from "next";
import { firebase_admin } from "./firebaseAdmin";
import cookie from "cookie";
export default function session(req:NextApiRequest,res:NextApiResponse){
    if(req.method=='POST'){
  const sessionCookie=req.body.sessionCookie;
    firebase_admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
  .then((decodedToken:any) => {
    console.log('Decoded claims:', decodedToken);
   
    res.status(200).json(decodedToken)
    
  })
  .catch((error:any) => {
  
    const clearCookieHeader=cookie.serialize('sessionCookie',"", {
      path: '/',
      expires: new Date(0),
      
  });

 
  res.setHeader('Set-Cookie',clearCookieHeader)
    res.status(401).json({status:"unauthorised"})
  });



}
}