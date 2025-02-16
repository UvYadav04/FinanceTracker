import React, { useState, useEffect } from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";
import { categoryAmountInterface } from "./LandingChart";

// Define the interface for categoryAmountInterface if not already defined
interface categoryAmountInterface {
    category: string;
    totalAmount: number;
}

const Chart = ({ chart }: { chart: categoryAmountInterface[] }) => {
    const [chartWidth, setChartWidth] = useState(window.innerWidth * 1);
    const [domainPadding, setDomainPadding] = useState(20);

    useEffect(() => {
        const updateChartSize = () => {
            const newWidth = window.innerWidth * 1;
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
        return <div className="text-slate-500 text-xl">No data to visualize</div>;

    // Calculate Y-Axis domain to prevent zooming out, leaving space for the bars
    const maxAmount = Math.max(...chart.map((item) => item.totalAmount));
    const yAxisDomain: [number, number] = [0, maxAmount + maxAmount * 0.2]; // 20% margin above the highest value

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl h-[400px]">
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={domainPadding} // Adjusted based on screen width
                    width={chartWidth}
                    height={440} // Increased height for better visibility
                >
                    {/* X-Axis with tilted labels */}
                    <VictoryAxis
                        style={{
                            tickLabels: {
                                fontSize: chartWidth < 600 ? 10 : 14,
                                angle: -40, // Tilt labels only when screen is smaller
                                textAnchor: "end", // Make sure text aligns correctly when tilted
                            },
                        }}
                    />
                    {/* Y-Axis with adjusted scale */}
                    <VictoryAxis
                        dependentAxis
                        domain={yAxisDomain} // Set domain to increase Y-axis scale dynamically
                        style={{
                            tickLabels: { fontSize: 10 },
                        }}
                    />
                    {/* Bar Chart */}
                    <VictoryBar
                        data={chart}
                        x="category"
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

export default Chart;
