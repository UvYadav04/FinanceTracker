import React, { useState, useEffect } from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";

const MergedBar = ({ chartData }) => {
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

    if (!chartData || chartData.length === 0) {
        return <p className="text-center">No data available for the chart.</p>;
    }

    // Calculate total amount and budget for each category
    const totalAmount = chartData.reduce((sum, item) => sum + item.totalAmount, 0);
    if (totalAmount === 0)
        return <div className="text-slate-500 text-xl">No data to visualize</div>;

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
                    {/* Bar Chart for totalAmount */}
                    <VictoryBar
                        data={chartData}
                        x="category"
                        y="totalAmount"
                        barWidth={chartWidth < 600 ? 20 : 30} // Adjust bar width for small screens
                        style={{
                            data: { fill: "teal" }, // Color for totalAmount
                        }}
                    />
                    {/* Bar Chart for budget */}
                    <VictoryBar
                        data={chartData}
                        x="category"
                        y="budget"
                        barWidth={chartWidth < 600 ? 20 : 30} // Adjust bar width for small screens
                        style={{
                            data: { fill: "orange" }, // Color for budget
                        }}
                    />
                </VictoryChart>
                {/* Legend */}
                <div className="flex justify-center space-x-4 mt-4">
                    <div className="flex items-center">
                        <div
                            className="w-6 h-6 bg-teal-500"
                            style={{ borderRadius: "50%" }}
                        ></div>
                        <span className="ml-2">Total Amount</span>
                    </div>
                    <div className="flex items-center">
                        <div
                            className="w-6 h-6 bg-orange-500"
                            style={{ borderRadius: "50%" }}
                        ></div>
                        <span className="ml-2">Budget</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MergedBar;
