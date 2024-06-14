import { useEffect, useState } from "react";
import { auth } from "../src/firebase/firebaseAuth";
import { useRouter } from "next/router";
import axios from "axios";
export default function Home(props: any) {
  const { role, email } = props.data;

  // console.log(auth.currentUser?.email);
  const router = useRouter();
  const [posts, setPosts] = useState<any>();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const data = await fetch("/api/posts");
    const response = await data.json();
    setPosts(response);
  }
  async function deletePostData(id: string) {
    const data = await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ docRefId: id }),
    });
    const response = await data.json();
  }

  return (
    <div>
      <div>email: {email}</div>
      <div>role:{role}</div>
      <button
        onClick={() => {
          axios.get("/api/signOut").then(() => router.push("/"));
        }}
      >
        SignOut
      </button>
      <br />
      {/* {posts &&
        posts.map((item: any) => (
          <>
            {item.docData.content}

            {
              <button
                className="bg-yellow-500"
                onClick={() => deletePostData(item.docRefId)}
              >
                Delete
              </button>
            }
            <br />
          </>
        ))} */}
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
      console.log(data, "ingetserverside");
      return {
        props: { data },
      };
    } catch (e) {
      console.log(e, "eee");
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
