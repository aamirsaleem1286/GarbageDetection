// components/Chart.js
"use client";

import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const pieData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
        {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: ["rgb(0, 0, 223)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            hoverOffset: 4,
        },
    ],
};

const doughnutData = {
    // labels: ["Red", "Blue", "Yellow"],
    datasets: [
        {
            label: "My First Dataset",
            data: [120, 70, 60, 50, 220],
            backgroundColor: ["#00BFFF", "#a31f4d", "#AFEEEE", "#DDA0DD", "#87CEFA"],
            hoverOffset: 4,
        },
    ],
};

export function PieChart() {
    return (
        <div>
            <h2>Pie Chart</h2>
            <Pie data={pieData} />
        </div>
    );
}

export function DoughnutChart() {
    return (
        <div>
            <Doughnut data={doughnutData} />
        </div>
    );
}
