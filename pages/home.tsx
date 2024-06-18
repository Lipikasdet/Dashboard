import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function Home(props: any) {
  const { role, email, companyName } = props.data;
  const router = useRouter();

  return (
    <div>
      <div>email: {email}</div>
      {role && <div>role:{role}</div>}
      {companyName && <div>companyName:{companyName}</div>}
      <button
        onClick={() => {
          axios.get("/api/signOut").then(() => router.push("/"));
        }}
      >
        SignOut
      </button>

      <br />
    </div>
  );
}
export async function getServerSideProps(context: any) {
  if (context.req.cookies.sessionCookie) {
    const sessionCookie = context.req.cookies.sessionCookie;
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/verifySessionCookie",
        {
          sessionCookie,
        }
      );

      return {
        props: { data },
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
