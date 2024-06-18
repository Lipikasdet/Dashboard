import { useEffect, useState } from "react";
import axios from "axios";
export default function Admin() {
  const [email, setUserEmail] = useState("");
  const [displayName, setUserName] = useState("");
  const [role, setRole] = useState("manager");
  const [manager, setManager] = useState("");
  const [managerList, setManagerList] = useState([]);
  const [managerEmail, setManagerEmail] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [projectList, setProjectList] = useState("");
  async function getUsersList() {
    const { data } = await axios.get("/api/usersList");
    setUsersList(data);
  }
  useEffect(() => {
    getUsersList();
  }, []);
  useEffect(() => {
    setManagerList(usersList.filter((item: any) => item.role === "manager"));
  }, [usersList]);
  async function deleteUser(uid: string) {
    axios.post("/api/deleteUser", { uid });
  }
  async function signUpFunction() {
    const dataToSend = {
      email,
      displayName,
      role,
      manager,
      managerEmail,
      projects: projectList.split(","),
    };
    const { data } = await axios.post("/api/signUp", dataToSend);
  }
  function handleSelectChange(e: any) {
    setRole(e.target.value);
  }
  function handleSelectManagerChange(e: any) {
    setManager(e.target.value);
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
            onChange={(e) => setUserName(e.target.value)}
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
            onChange={(e) => setUserEmail(e.target.value)}
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
              {managerList.map((item: any) => (
                <option key={item.email} value={item.displayName}>
                  {item.displayName}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              className="border-solid border-black border-2"
              id="manager"
              value={manager}
              onChange={(e: any) => setManager(e.target.value)}
            /> */}
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
          {usersList.map((item: any) => (
            <>
              {item.displayName}
              {/* <button
                className="bg-red-500 m-3"
                onClick={() => deleteUser(item.uid)}
              >
                Delete
              </button> */}
              <br />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
