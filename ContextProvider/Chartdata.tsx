'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context
interface ArrayContextType {
    expenses: Object[];
    setexpenses: (newArray: Object[]) => void;
}

// Create the Context with a default value
const ArrayContext = createContext<ArrayContextType | undefined>(undefined);

// Create the Provider Component
export const ArrayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [expenses, setexpenses] = useState<Object[]>([]); // Empty array

    return (
        <ArrayContext.Provider value={{ expenses, setexpenses }}>
            {children}
        </ArrayContext.Provider>
    );
};

// Custom hook to use the Array context
export const useArray = () => {
    const context = useContext(ArrayContext);
    if (!context) {
        throw new Error('useArray must be used within an ArrayProvider');
    }
    return context;
};
