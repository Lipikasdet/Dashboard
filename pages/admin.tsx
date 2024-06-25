import Admin from "@/src/admin";
import axios from "axios";
export default function AdminPage(props: { data: any }) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Admin data={props.data} />
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
