interface ProjectDetails {
  projectName: string;
  initialDate: string;
  client: string;
  manager: string;
}
interface ProjectTableProps {
  projectDetails: ProjectDetails | null;
}
const ProjectTable: React.FC<ProjectTableProps> = ({ projectDetails }) => {
  if (!projectDetails) return <p>No project details available.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Initial Date</th>
          <th>Client</th>
          <th>Manager</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{projectDetails.projectName}</td>
          <td>{projectDetails.initialDate}</td>
          <td>{projectDetails.client}</td>
          <td>{projectDetails.manager}</td>
        </tr>
      </tbody>
    </table>
  );
};
export default ProjectTable;
