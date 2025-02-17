import React, { useState, useEffect } from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";
import { MonthAmount } from "../Dashboard";
const BarChart = ({ chart }: { chart: MonthAmount[] }) => {
    const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.9);
    const [domainPadding, setDomainPadding] = useState(20);

    useEffect(() => {
        const updateChartSize = () => {
            const newWidth = window.innerWidth * 0.9;
            setChartWidth(newWidth);
            setDomainPadding(newWidth < 600 ? 10 : 20); // Reduce padding on smaller screens
        };

        window.addEventListener("resize", updateChartSize);
        return () => window.removeEventListener("resize", updateChartSize);
    }, []);

    if (!chart || chart.length === 0) {
        return <p className="text-center">No data available for the chart.</p>;
    }

    const totalAmount = chart.reduce((sum, item) => sum + item.totalAmount, 0);
    if (totalAmount === 0)
        return <div className="text-slate-500 text-xl">No data to visualize</div>
    else
        return (
            <div className="w-full flex justify-center">
                <div className="w-full max-w-5xl h-[300px]">
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={domainPadding} // Adjusted based on screen width
                        width={chartWidth}
                        height={300}
                    >
                        {/* X-Axis */}
                        <VictoryAxis
                            style={{
                                tickLabels: { fontSize: chartWidth < 600 ? 8 : 10, angle: chartWidth < 600 ? -25 : 0 },
                            }}
                        />
                        {/* Y-Axis */}
                        <VictoryAxis
                            dependentAxis
                            style={{
                                tickLabels: { fontSize: 10 },
                            }}
                        />
                        {/* Bar Chart */}
                        <VictoryBar
                            data={chart}
                            x="month"
                            y="totalAmount"
                            barWidth={chartWidth < 600 ? 20 : 30} // Adjust bar width for small screens
                            style={{
                                data: { fill: "teal" },
                            }}
                        />
                    </VictoryChart>
                </div>
            </div>
        );
};

export default BarChart;
