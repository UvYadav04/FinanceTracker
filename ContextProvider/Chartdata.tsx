'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for a transaction
interface Transaction {
    date: string; // ISO string date
    amount: number;
    category: string;
    _id: string;
    description: string;
}

// Define the type for the context
interface ArrayContextType {
    expenses: Transaction[]; // Array of Transaction objects
    setexpenses: (newArray: Transaction[]) => void; // Function to update the expenses state
}

// Create the Context with a default value
const ArrayContext = createContext<ArrayContextType | undefined>(undefined);

// Create the Provider Component
export const ArrayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [expenses, setexpenses] = useState<Transaction[]>([]); // Empty array of transactions

    return (
        <ArrayContext.Provider value={{ expenses, setexpenses }}>
            {children}
        </ArrayContext.Provider>
    );
};

// Custom hook to use the Array context
export const useArray = (): ArrayContextType => {
    const context = useContext(ArrayContext);
    if (!context) {
        throw new Error('useArray must be used within an ArrayProvider');
    }
    return context;
};
