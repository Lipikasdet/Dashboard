import axios from "axios";
import { Chart } from "react-google-charts";
import BarChart from "@/src/chart";

export default function App(props: { data: any }) {
  const dataFromServer = props.data;

  return <BarChart dataInBar={dataFromServer} />;
}

export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:3001/api/getData");
  return {
    props: { data: data.data },
  };
}
