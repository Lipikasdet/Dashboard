interface SprintData {
    [field: string]: string | number;
  }
  
  interface SprintTableProps {
    sprintData: SprintData;
  }
  
  const SprintTable: React.FC<SprintTableProps> = ({ sprintData }) => {
    if (!sprintData || Object.keys(sprintData).length === 0) {
      return <p>No sprint data available.</p>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(sprintData).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(sprintData).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };
  
  export default SprintTable;