import React, { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import PieChart from './Charts/Pie';
import BarChart from './Charts/Bar';
import Compare from './Charts/Compare';

const Chart = ({ chart }) => {
    // console.log(chart)
    const [type, settype] = useState<number>(0)
    return (
        <div className='my-5 mb-10'>
            <button onClick={() => settype(0)} className='bg-teal-400 text-white px-3 py-1 rounded-md'>Bar Chart</button>
            <button onClick={() => settype(1)} className='bg-teal-400 ms-2 text-white px-3 py-1 rounded-md'>Pie Chart</button>
            <button onClick={() => settype(2)} className='bg-teal-400 ms-2 text-white px-3 py-1 rounded-md'>Compare budget</button>
            {
                type === 0 ? (
                    <BarChart chart={chart} />
                ) : type === 1 ? (
                    <PieChart chart={chart} />
                ) : (
                    <Compare />
                )
            }

        </div>

    );
};

export default Chart;
