import { useEffect, useState } from "react";
import axios from "axios";
export default function Admin(props: { data: any }) {
  const { email: emailOfUser, role: roleOfUser, companyName } = props.data;
  const [email, setUserEmail] = useState("");
  const [displayName, setUserName] = useState("");
  const [role, setRole] = useState("manager");
  const [manager, setManager] = useState("");
  const [managerList, setManagerList] = useState([]);
  const [managerEmail, setManagerEmail] = useState("abc");
  const [usersList, setUsersList] = useState([]);
  const [projectList, setProjectList] = useState("");
  interface userList {
    email: string;
    displayName: string;
    role: string;
  }
  async function getUsersList() {
    const { data } = await axios.get(`/api/usersList?company=${companyName}`);
    setUsersList(data);
  }
  useEffect(() => {
    getUsersList();
  }, []);
  useEffect(() => {
    setManagerList(
      usersList.filter((item: userList) => item.role === "manager")
    );
  }, [usersList]);

  async function signUpFunction() {
    const dataToSend = {
      email,
      displayName,
      role,
      manager,
      managerEmail,
      companyName,
      createdBy: emailOfUser,
      projects: projectList.split(","),
    };
    try {
      await axios.post("/api/signUp", dataToSend);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRole(e.target.value);
  }
  function handleSelectManagerChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setManager(value);
    const isManagerPresent: any = managerList.find(
      (item: userList) => item.displayName == value
    );
    isManagerPresent && setManagerEmail(isManagerPresent.email);
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-1/2 h-[400px]  bg-gray-200 rounded-md text-center ">
        <div className="font-bold">Add manager</div>
        <div className="mt-5 flex">
          <label htmlFor="userID" className="w-1/2">
            Full Name:
          </label>
          <input
            type="text"
            className="border-solid border-black border-2 "
            id="userID"
            value={displayName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
        </div>
        <div className="mt-5 flex">
          <label htmlFor="userID" className=" w-1/2">
            Email:
          </label>
          <input
            type="text"
            className="border-solid border-black border-2"
            id="userID"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserEmail(e.target.value)
            }
          />
        </div>
        <div className="mt-5 flex">
          <label htmlFor="userID" className=" w-1/2">
            Role:
          </label>
          <select name="role" value={role} onChange={handleSelectChange}>
            <option value="manager">Manager</option>
            <option value="client">Client</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        {role == "employee" && (
          <div className="mt-5 flex">
            <label htmlFor="userID" className=" w-1/2">
              Manager:
            </label>
            <select
              name="manager"
              value={manager}
              onChange={handleSelectManagerChange}
            >
              {managerList.map((item: userList) => (
                <option
                  key={item.email}
                  value={item.displayName}
                  onClick={() => {
                    setManagerEmail(item.email);
                  }}
                >
                  {item.displayName}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mt-5 flex">
          <label htmlFor="userID" className=" w-1/2">
            Projects :
          </label>
          <input
            type="text"
            className="border-solid border-black border-2"
            id="userID"
            value={projectList}
            onChange={(e) => setProjectList(e.target.value)}
          />
        </div>

        <button
          className="mt-5 border-solid border-black border-2"
          onClick={signUpFunction}
        >
          Sign Up
        </button>
        <div>
          UsersList
          <br />
          {usersList.map((item: userList) => (
            <div key={item.email}>{item.displayName}</div>
          ))}
        </div>
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
