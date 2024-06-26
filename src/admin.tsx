import { useEffect, useState } from "react";
import axios from "axios";
import Form from "@/src/components/projectForm";
import { UserSignUp } from "./firebase/signUp";
export default function Admin(props: { data: any }) {
  const { email: emailOfUser, companyName } = props.data;
  const [email, setUserEmail] = useState("");
  const [displayName, setUserName] = useState("");
  const [role, setRole] = useState("manager");
  const [manager, setManager] = useState("");
  const [managerList, setManagerList] = useState([]);
  const [managerEmail, setManagerEmail] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [managerListOptions, setManagerListOptions] = useState<any[]>([]);
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
    console.log(managerListOptions, usersList);
    managerListForSelect();
  }, [usersList]);

  function managerListForSelect() {
    let list: any = [];
    managerList.map((item: any) =>
      list.push({ label: item.displayName, value: item.email })
    );
    setManagerListOptions(list);
  }

  async function signUpFunction() {
    const dataToSend = {
      email,
      displayName,
      role,
      manager,
      managerEmail,
      companyName,
      createdBy: emailOfUser,
    };
    try {
      const result = await UserSignUp(dataToSend);

      if (result.isSignUpSuccess) {
        alert("Email verification sent ");
      } else {
        throw result.error; // This will be caught by the catch block
      }
    } catch (error) {
      console.log(error);
      alert("signup of user failed");
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
    <div className="">
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
                <option value="dontselect" hidden>
                  Select
                </option>
                {managerList.map((item: userList) => (
                  <option key={item.email} value={item.displayName}>
                    {item.displayName}
                  </option>
                ))}
              </select>
            </div>
          )}

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
      <Form managerList={managerListOptions} companyName={companyName} />
    </div>
  );
}
