import { useRouter } from "next/router";
import axios from "axios";
import ManagerUI from "@/src/managerUI";
import EmployeeUI from "@/src/employeeUI";
export default function Home(props: any) {
  const { role } = props.data;
  console.log(props.data);
  const router = useRouter();
  function signOut() {
    try {
      axios.get("/api/signOut").then(() => router.push("/"));
    } catch (error) {
      alert("Error while signing out");
    }
  }

  return (
    <div className="p-5">
      <div className="flex flex-row-reverse w-full mb-5">
        <button
          className="bg-blue-200 p-1 rounded-md font-semibold"
          onClick={signOut}
        >
          SignOut
        </button>
        {role == "manager"}

        <br />
      </div>
      {role == "manager" ? <ManagerUI data={props.data} /> : <EmployeeUI />}
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
      const { email } = data;
      const { data: dataofUser } = await axios.get(
        `http://localhost:3000/api/userData?userEmail=${email}`
      );

      return {
        props: { data: dataofUser },
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
