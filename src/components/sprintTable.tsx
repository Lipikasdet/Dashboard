interface SprintData {
  [field: string]: string | number;
}
interface SprintTableProps {
  sprintData: SprintData;
}
const SprintTable: React.FC<SprintTableProps> = ({ sprintData }: any) => {
  const modifiedSprintData: SprintData[] = Object.values(sprintData);
  if (modifiedSprintData.length === 0) {
    return <p>No sprint data available.</p>;
  }
  const headers = Object.keys(modifiedSprintData[0]);
  return (
    <table>
      <thead>
        <tr className="flex w-screen gap-1 ">
          {headers.map((key) => (
            <th className="flex-1 flex justify-center bg-zinc-400" key={key}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {modifiedSprintData.map((eachSprint: any, index: number) => (
            <div key={index} className="flex w-screen">
              {headers.map((item) => (
                <td
                  className="flex-1  flex justify-center bg-zinc-200"
                  key={item}
                >
                  {eachSprint[item]}
                </td>
              ))}
              <br />
            </div>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
export default SprintTable;
