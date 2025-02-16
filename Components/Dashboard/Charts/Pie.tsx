import React from 'react';
import { VictoryLabel, VictoryPie, VictoryTheme } from 'victory';

import { MonthAmount } from '../Dashboard';

const PieChartExample = ({ chart }: { chart: MonthAmount[] }) => {
    const totalAmount = chart.reduce((sum, item) => sum + item.totalAmount, 0);

    const formattedData = chart.map((item, index) => ({
        x: item.month,
        y: (item.totalAmount / totalAmount) * 100, // Convert to percentage
    }));
    if (totalAmount === 0)
        return <div className="text-slate-500 text-xl">No data to visualize</div>
    else
        return (
            <div style={{ width: '100%', height: '400px' }}>
                <VictoryPie
                    width={400}
                    height={400}
                    data={formattedData}
                    innerRadius={68}
                    labelRadius={100}
                    theme={VictoryTheme.clean}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20 }}
                    x={200}
                    y={200}
                />
            </div>
        );
};

export default PieChartExample;
