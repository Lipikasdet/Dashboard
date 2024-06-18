// pages/LoginPage.js

import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../src/firebase/firebaseAuth";
import signIn from "@/src/firebase/signIn";
import { useRouter } from "next/router";
import axios from "axios";
const LoginPage = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const role = await signIn(userID, password);
    role == "admin" ? router.push(`/admin`) : router.push("/home");
  };
  console.log(auth.currentUser?.email, "inLogin");

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            className="border-solid border-black border-2"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="border-solid border-black border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
        <br />
        <Link href="/signUp">
          <button>Signup</button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
export async function getServerSideProps(context: any) {
  if (context.req.cookies.sessionCookie) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
