// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { firebase_admin } from "./firebaseAdmin";

export default async function sendEmail(req:NextApiRequest, res:NextApiResponse) {
  if (req.method == POST) {
    try {
      await axios.post('/api/send-email', { to, subject, body });
  } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email.');
  }
};
