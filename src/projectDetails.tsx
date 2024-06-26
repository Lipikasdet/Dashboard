import { useState, useEffect } from "react";
import ProjectTable from "./components/projectTable";
import SprintTable from "./components/sprintTable";
interface ProjectDetails {
  projectName: string;
  initialDate: string;
  client: string;
  manager: string;
  companyName: string;
}

interface SprintData {
  [key: string]: {
    [field: string]: string;
  };
}
const Dashboard = ({
  projectName,
  companyName,
}: {
  projectName: string;
  companyName: string;
}) => {
  const [data, setData] = useState<{
    projectDetails: ProjectDetails | null;
    sprintData: SprintData;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      console.log(companyName);
      const response = await fetch(
        `/api/sheetData?projectName=${projectName}&companyName=${companyName}`
      );
      if (!response.ok) {
        throw new Error(`Error:${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetchData();
  }, [projectName]);
  console.log(JSON.stringify(data?.sprintData));
  return (
    <div>
      <h1>Project data</h1>
      {loading && <p>Loading....</p>}

      {data && (
        <>
          <h2>Project Details</h2>
          <ProjectTable projectDetails={data.projectDetails} />
          <h2>Sprint Data</h2>
          {Object.keys(data.sprintData).map((sheetName) => (
            <>
              <div key={sheetName}>
                <div className="font-bold">{sheetName}</div>
                <SprintTable sprintData={data.sprintData[sheetName]} />
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};
export default Dashboard;
