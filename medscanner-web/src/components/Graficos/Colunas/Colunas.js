import React from "react";
import { Chart } from "react-google-charts";

export function Colunas({ data }) {
  return (
    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
  );
}
