"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Chart from "chart.js/auto";
import { DoughnutChart } from "@/components/chart";
import icon1 from "../../../public/person.png";
import icon2 from "../../../public/contact.jpg";
import icon3 from "../../../public/loc.jpg";
import icon4 from "../../../public/user.png";

const Page: React.FC = () => {
    const [salesData, setSalesData] = useState<{ month: string; sales: number }[]>([]);
    const [weeklySalesData, setWeeklySalesData] = useState<{ day: string; sales: number }[]>([]);

    useEffect(() => {
        const monthlySales = [
            { month: "January", sales: 100 },
            { month: "February", sales: 150 },
            { month: "March", sales: 200 },
            { month: "April", sales: 180 },
            { month: "May", sales: 420 },
            { month: "June", sales: 750 },
            { month: "July", sales: 100 },
            { month: "August", sales: 850 },
            { month: "September", sales: 200 },
            { month: "October", sales: 450 },
            { month: "November", sales: 300 },
            { month: "December", sales: 750 },
        ];

        const weeklySales = [
            { day: "Monday", sales: 50 },
            { day: "Tuesday", sales: 70 },
            { day: "Wednesday", sales: 90 },
            { day: "Thursday", sales: 60 },
            { day: "Friday", sales: 120 },
            { day: "Saturday", sales: 200 },
            { day: "Sunday", sales: 80 },
        ];

        setSalesData(monthlySales);
        setWeeklySalesData(weeklySales);
    }, []);

    const renderLineChart = useCallback(() => {
        const ctx = document.getElementById("lineChart") as HTMLCanvasElement | null;
        if (ctx) {
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: weeklySalesData.map((data) => data.day),
                    datasets: [
                        {
                            label: "Weekly Report",
                            data: weeklySalesData.map((data) => data.sales),
                            fill: false,
                            borderColor: "#FB5299",
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Days",
                            },
                            ticks: {
                                color: "black",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Report",
                            },
                            ticks: {
                                color: "black",
                            },
                        },
                    },
                },
            });
        } else {
            console.error("Line chart canvas element not found.");
        }
    }, [weeklySalesData]);

    const renderBarChart = useCallback(() => {
        const ctx = document.getElementById("barChart") as HTMLCanvasElement | null;
        if (ctx) {
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: salesData.map((data) => data.month),
                    datasets: [
                        {
                            label: "Monthly Report",
                            data: salesData.map((data) => data.sales),
                            backgroundColor: salesData.map(() => "#" + (Math.random().toString(16) + "000000").substring(2, 8)),
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Months",
                            },
                            ticks: {
                                color: "black",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Report",
                            },
                            ticks: {
                                color: "black",
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });
        } else {
            console.error("Bar chart canvas element not found.");
        }
    }, [salesData]);

    useEffect(() => {
        if (salesData.length > 0) {
            renderLineChart();
            renderBarChart();
        }
    }, [salesData, renderLineChart, renderBarChart]);

    const stats = [
        {
            icon: icon1,
            color: "#F39513",
            title: "GARBAGE LOCATION",
            value: "7",
            valueSize: "text-xl",
        },
        {
            icon: icon2,
            color: "#FF6869",
            title: "DETAILED INFORMATION",
            value: "16",
            valueSize: "text-2xl",
        },
        {
            icon: icon3,
            color: "#6698FF",
            title: "VIEW ON A MAP",
            value: "16%",
            valueSize: "text-2xl",
        },
        {
            icon: icon4,
            color: "#FE8330",
            title: "Total Users",
            value: "666",
            valueSize: "text-2xl",
        },
    ];

    return (
        <div>
            <Link href={"/"} className="font-bold text-lg p-4 flex items-center gap-2">
                <ArrowLeft />
            </Link>
            <div className="grid grid-cols-2 gap-4 justify-center mx-2 md:mx-4 lg:mx-[30px]">
                {stats.map(({ icon, color, title, value, valueSize }, index) => (
                    <div key={index} className="w-full sm:w-auto rounded-lg p-4 bg-slate-100 flex flex-col items-center justify-center text-center">
                        <div style={{ backgroundColor: color }} className="w-12 h-12 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Image src={icon} alt={title} width={38} height={35} className="object-cover" />
                        </div>
                        <h2 className="text-lg sm:text-2xl font-bold text-black">{title}</h2>
                        <h1 className={`text-[#777777] text-md sm:text-xl ${valueSize}`}>{value}</h1>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="relative bg-slate-100" style={{ width: "340px", marginLeft: "7px" }}>
                    <h1 className="text-2xl font-bold mt-6 ml-4 text-black">Monthly Garbage Collection Trends (Bar Chart)</h1>
                    <canvas id="barChart" className="chart w-full" height="300"></canvas>
                </div>
                <div className="relative bg-slate-100" style={{ width: "340px", marginLeft: "7px", minHeight: "480px" }}>
                    <h1 className="text-2xl font-bold mt-6 ml-4 text-black">Weekly Garbage Collection Trends (Line Chart)</h1>
                    <canvas id="lineChart" className="chart w-full" height="300"></canvas>
                </div>
            </div>
            {/* <div className="bg-slate-100" style={{ width: "340px", marginLeft: "7px", minHeight: "480px" }}>
                <h1 className="text-2xl font-bold mt-6 ml-4 text-black">Yearly Garbage Collection Trends (Donut Chart) </h1>
                <DoughnutChart />
            </div>
            <label htmlFor="message" className="text-white mt-5 text-lg text-semibold font-semibold">
                Your Message
            </label> */}
        </div>
    );
};

export default Page;
