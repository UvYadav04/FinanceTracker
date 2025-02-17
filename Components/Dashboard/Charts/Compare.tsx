import React, { useEffect, useState } from 'react'
import { aggregateByCategory, categoryAmountInterface } from '@/Components/LandingChart/LandingChart';
import { useArray } from '@/ContextProvider/Chartdata';
import MergedBar from './MergedBar';
import { MonthAmountMap, Transaction } from '../Dashboard';
import { MonthAmount } from '../Dashboard';
export interface MergedInterface {
    category: string,
    totalAmount: number,
    budget: number
}

function Compare() {
    const [chartdata, setchartdata] = useState<categoryAmountInterface[]>([])
    const [mergeddata, setmergeddata] = useState<MergedInterface[]>([])
    const { expenses } = useArray()
    const monthlyBudgets: MonthAmountMap = {
        "Stationary": 1000,
        "Groceries": 5000,
        "Entertainment": 3000,
        "Transport": 2000,
        "Health & Wellness": 1500,
        "Dining": 2500,
        "Subscriptions": 1000,
        "Electronics": 4000,
        "Education": 3000,
        "Rent": 20000,
        "Utilities": 3000,
        "Shopping": 2500,
        "Personal Care": 2000,
        "Travel": 5000,
        "Insurance": 1500,
        "Miscellaneous": 1000
    };

    useEffect(() => {
        const mergedData = chartdata.map((item: categoryAmountInterface) => ({
            category: item.category,
            totalAmount: item.totalAmount,
            budget: monthlyBudgets[item.category] || 0, // Default to 0 if no budget is found
        }));
        setmergeddata(mergedData)
    }, [chartdata])


    console.log(mergeddata)
    useEffect(() => {
        setchartdata(aggregateByCategory(expenses))
    }, [])

    return (
        <MergedBar chartData={mergeddata} />
    )
}

export default Compare
