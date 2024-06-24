import { useEffect, useState } from "react";
import ProjectData from "./projectDetails";
interface managerData {
  role: string;
  projects: string[];
  manager: string;
  createdBy: string;
  displayName: string;
  companyName: string;
  email: string;
  createdAt: string;
}
export default function ManagerUI({ data }: { data: managerData }) {
  console.log(data);

  const { projects, displayName, email } = data;
  const [projectData, setProjectData] = useState<any>();

  const [projectSelected, setProjectSelected] = useState(projects[0]);
  async function onProjectChange(projectSelected: string) {
    try {
      const response = await fetch(
        `/api/sheetData?projectName=${projectSelected}`
      );
      if (!response.ok) {
        throw new Error(`Error:${response.statusText}`);
      }

      const result = await response.json();
      setProjectData(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data");
      }
    }
  }
  useEffect(() => {
    onProjectChange(projectSelected);
  }, [projectSelected]);
  console.log(projectData);
  return (
    <div className="">
      <div className="flex gap-10 w-full bg-gray-300 p-3 rounded-md">
        {projects.map((item) => (
          <>
            <button
              className={` p-2 ${
                projectSelected == item
                  ? "border-solid border-b-2 border-black"
                  : ""
              }`}
              onClick={() => setProjectSelected(item)}
            >
              {item}
            </button>
          </>
        ))}
      </div>
      <ProjectData projectName={projectSelected} />
    </div>
  );
}
