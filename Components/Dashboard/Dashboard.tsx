'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DialogDemo } from './Dialog'
import Box from './Box'
import { useArray } from '@/ContextProvider/Chartdata'
import Chart from './Chart'

export interface Transaction {
    date: string; // ISO string date
    amount: number;
    category: string;
    _id: string,
    description: string
}

export interface MonthAmountMap {
    [month: string]: number;
}

export interface MonthAmount {
    month: string;
    totalAmount: number;
}

interface BoxData {
    // Define the shape of box data based on what is passed to the Box component
    // This is just an example and should be replaced with actual fields
    id: string;
    description: string;
    amount: number;
}

function Dashboard() {
    const categories = ["Stationary", "Groceries", "Entertainment", "Transport", "Health & Wellness", "Dining", "Subscriptions", "Electronics", "Education", "Rent", "Utilities", "Shopping", "Personal Care", "Travel", "Insurance", "Miscellaneous"];
    const { expenses } = useArray();
    const [year, setyear] = useState<number>(2025);
    const [cat, setcat] = useState<string>(categories[0]);
    const [chartdata, setchartdata] = useState<Transaction[]>([]);
    const [chart, setchart] = useState<MonthAmount[]>([]);
    const [boxdata, setboxdata] = useState<Transaction[]>([]);

    function prepareChart(transactions: Transaction[]) {
        const monthAmountMap: MonthAmountMap = {};
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Initialize monthAmountMap to have all months with 0 amount
        monthNames.forEach((item) => {
            monthAmountMap[item] = 0;
        });

        transactions.forEach(transaction => {
            const monthIndex = new Date(transaction.date).getMonth(); // Get the 0-indexed month
            const month = monthNames[monthIndex]; // Get the month name
            monthAmountMap[month] += transaction.amount; // Add the amount for the corresponding month
        });

        // Convert the monthAmountMap into an array of objects
        const result: MonthAmount[] = Object.keys(monthAmountMap).map(month => ({
            month: month,
            totalAmount: monthAmountMap[month]
        }));

        // Set the result to the chart state
        setchart(result);
    }

    useEffect(() => {
        const sortedData = chartdata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setboxdata(sortedData);
    }, [chartdata, chart]);

    useEffect(() => {
        const filtered = expenses.filter((item: Transaction) => item.category === cat && new Date(item.date).getFullYear() === year);
        setchartdata(filtered);
        prepareChart(filtered);
    }, [year, cat]);

    useEffect(() => {
        const filtered = expenses.filter((item) => item.category === cat && new Date(item.date).getFullYear() === year);
        setchartdata(filtered);
        prepareChart(filtered);
    }, [expenses]);

    return (
        <div className='w-[90%] bg-white h-fit pt-3 md:px-8 px-2 flex flex-col gap-5 py-3 mx-auto'>
            <div className="header flex justify-start place-items-center gap-4 bg-slate-100 w-full  md:p-2 p-0">
                <DialogDemo />
                <select className='rounded-md px-1 text-lg' onChange={(e) => setcat(e.target.value)}>
                    {categories.map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
                <select className='rounded-md px-1 text-lg ' name="sort" id="sort" onChange={(e) => setyear(Number(e.target.value))}>
                    <option value={2025}>2025</option>
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>
                    <option value={2021}>2021</option>
                </select>
            </div>

            <div className="chart w-full">
                <Chart chart={chart} />
            </div>

            <div className="boxes flex flex-wrap justify-between gap-1">
                <h1 className='md:text-2xl text-xl text-teal-500 w-full text-start font-semibold'>Expenses : </h1>
                {boxdata.length > 0 ?
                    boxdata.map((item, index) => (
                        <Box item={item} key={index} />
                    )) :
                    <h1 className='text-3xl text-slate-400 w-full text-center mt-5'>No Expenses to show</h1>
                }
            </div>
        </div>
    );
}

export default Dashboard;
