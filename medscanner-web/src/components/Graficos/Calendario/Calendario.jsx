import React from "react";
import { Chart } from "react-google-charts";

const dataInicial = [
    { type: "date", id: "Date" },
    { type: "number", id: "Won/Loss" },
];

export function Calendario({ data = [dataInicial], title }) {
    const options = {
        title: title,
        noDataPattern: {
            backgroundColor: 'white',
            color: '#D9E9E4'
        },
        calendar: {
            daysOfWeek: 'DSTQQSS',
            //cellSize: window.innerWidth * 0.013, // Tamanho do gráfico
            cellColor: {
            stroke: '#3F8576', // Cor dos blocos vazios
            strokeOpacity: 0.5,
            strokeWidth: 1,
            },
            monthOutlineColor: {
                stroke: 'black', // Cor das linhas que separam os meses
                strokeOpacity: .4,
                strokeWidth: 2
            },
            focusedCellColor: {
            stroke: 'white', // Cor quando passa o mouse em cima do bloco
            strokeOpacity: 0.8,
            strokeWidth: 3
            },
            unusedMonthOutlineColor: {
                stroke: 'white', // Cor dos meses sem dados
                strokeOpacity: 0,
                strokeWidth: 2
            },
        }
    };

    return (
        <Chart
            chartType="Calendar"
            width="100%"
            data={data}
            options={options}
        />
    );
}
