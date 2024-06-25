// pages/LoginPage.js

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { adminSignUp } from "@/src/firebase/signUp";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const router = useRouter();
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    // signUp(email, password);
    const signUpData = {
      email,
      companyName,
      password,
      displayName,
    };
    try {
      const result = await adminSignUp(signUpData);

      if (result.isSignUpSuccess) {
        router.push("/");
        // Optionally redirect the user or clear the form
      } else {
        throw result.error; // This will be caught by the catch block
      }
    } catch (error) {
      console.log(error);
      alert("signuo failed");
    }
  };

  return (
    <div className="bg-gray-300 h-screen w-screen flex justify-center items-center">
      <div className="w-[60%] bg-gray-400 h-[60%] rounded-xl overflow-hidden">
        <div className="flex w-full h-full  overflow-hidden">
          <div className="w-1/2 bg-gray-600 h-full bg-[url('/loginBg.jpg')] bg-cover"></div>
          <div className="w-1/2  h-full bg-gray-200">
            <div className="p-5 flex flex-col justify-center h-full gap-5">
              <div className="w-full flex items-center ">
                <label htmlFor="userID" className="w-[40%] font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  className="border-solid border-gray-400 rounded-md border-2  p-1 "
                  id="userID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full flex items-center ">
                <label htmlFor="userID" className="w-[40%] font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  className="border-solid border-gray-400 rounded-md border-2  p-1 "
                  id="userID"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="w-full flex items-center ">
                <label htmlFor="password" className="w-[40%] font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="border-solid border-gray-400 rounded-md border-2  p-1 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="w-full flex items-center ">
                <label htmlFor="password" className="w-[40%] font-semibold">
                  Company Name
                </label>
                <input
                  type="textS"
                  id="password"
                  className="border-solid border-gray-400 rounded-md border-2  p-1 "
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <button
                onClick={handleSignUp}
                className="bg-black text-white rounded-md py-1"
              >
                Sign up
              </button>
              <Link
                href="/"
                className="flex w-full justify-between   text-sm font-semibold text-zinc-600 "
              >
                Click here to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
