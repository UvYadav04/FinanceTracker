import React, { useEffect, useState } from 'react'
import Chart from './Chart';
// List of categories to initialize with 0 amount
const categories = [
    "Stationary", "Groceries", "Entertainment", "Transport", "Health & Wellness",
    "Dining", "Subscriptions", "Electronics", "Education", "Rent", "Utilities",
    "Shopping", "Personal Care", "Travel", "Insurance", "Miscellaneous"
];
function LandingChart({ chart }) {


    const [chartdata, setchartdata] = useState([]);




    useEffect(() => {
        setchartdata(aggregateByCategory(chart))
    }, [])

    return (
        <div className=' px-2  w-[90%] mx-auto bg-white '>
            <h1 className='w-full text-center text-3xl m-3 text-teal-600 mb-5'>OverAll Expenses</h1>
            <Chart chart={chartdata} />
        </div>
    )
}

export default LandingChart

export const aggregateByCategory = (data) => {
    const categoryAmountMap = {};
    console.log(data)

    // Initialize all categories with 0 amount
    categories.forEach((item) => {
        categoryAmountMap[item] = 0;
    });

    // Ensure 'data' exists and is not empty
    if (!data || data.length === 0) return [];

    // Aggregate amounts by category
    data.forEach(({ category, amount }) => {
        if (categoryAmountMap.hasOwnProperty(category)) {
            categoryAmountMap[category] += amount;
        }
    });

    // Convert to array format
    const result = Object.keys(categoryAmountMap).map(category => ({
        category,
        totalAmount: categoryAmountMap[category]
    }));

    console.log(result)

    return result;
};
