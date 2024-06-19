import { useState, useEffect } from "react";
import ProjectTable from "./components/projectTable";
import SprintTable from "./components/sprintTable";
interface ProjectDetails {
  projectName: string;
  initialDate: string;
  client: string;
  manager: string;
}

interface SprintData {
  [key: string]: {
    [field: string]: string;
  };
}
const Dashboard = () => {
  const [projectName, setProjectName] = useState("");
  const [data, setData] = useState<{
    projectDetails: ProjectDetails | null;
    sprintData: SprintData;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!projectName) {
      setError("project name is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/sheetData?projectName=${encodeURIComponent(projectName)}`
      );
      if (!response.ok) {
        throw new Error(`Error:${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data", error.message);
        setError("Unknown error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectName]);
  console.log(JSON.stringify(data?.sprintData));
  return (
    <div>
      <h1>Project data</h1>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={fetchData} disabled={!projectName || loading}>
        Fetch Data
      </button>
      {loading && <p>Loading....</p>}
      {error && <p>Error: {error}</p>}
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
