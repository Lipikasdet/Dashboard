import Admin from "@/src/admin";
import axios from "axios";
import router from "next/router";
export default function AdminPage(props: { data: any }) {
  function signOut() {
    try {
      axios.get("/api/signOut").then(() => router.push("/"));
    } catch (error) {
      alert("Error while signing out");
    }
  }
  return (
    <div>
      <div className="flex flex-row-reverse w-full mb-5">
        <button
          className="bg-blue-200 p-1 rounded-md font-semibold"
          onClick={signOut}
        >
          SignOut
        </button>

        <br />
      </div>
      <div>
        <Admin data={props.data} />
      </div>
    </div>
  );
}
export async function getServerSideProps(context: any) {
  const sessionCookie = context.req.cookies.sessionCookie;
  if (sessionCookie) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/verifySessionCookie",
        {
          sessionCookie,
        }
      );
      const { role } = data;
      if (role != "admin")
        return {
          redirect: {
            destination: "/home",
            permanent: false,
          },
        };

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
