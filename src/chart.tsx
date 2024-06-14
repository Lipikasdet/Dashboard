import { useState, useEffect } from "react";
import Chart from "react-google-charts";
export default function BarChart(props: { dataInBar: any }) {
  const dataFromServer = props.dataInBar;

  const [fullDataInChart, setFullDataInChart] = useState<any>();
  useEffect(() => {
    const x: any = [];
    const y: any = [];

    dataFromServer.forEach((item: any, index: any) => {
      x.push([
        item.Sprint,
        item["Total Defects Observed"],
        item["Defects Fixed"],
      ]);
    });
    setFullDataInChart([["Graph ", "Defects-Observed", "Defects fixed"], ...x]);
  }, []);
  console.log(fullDataInChart);
  return (
    <Chart chartType="Bar" width="0%" height="300px" data={fullDataInChart} />
  );
}
