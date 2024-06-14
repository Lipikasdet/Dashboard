import { NextApiRequest, NextApiResponse } from "next";
import { firebase_admin } from "./firebaseAdmin";

export default async function signOut(req:NextApiRequest,res:NextApiResponse){
    res.setHeader('Set-Cookie', 'sessionCookie=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly');
    res.status(200).json("cookie removed")
}