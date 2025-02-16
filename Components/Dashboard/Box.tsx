import { useArray } from '@/ContextProvider/Chartdata';
import { redirect } from 'next/navigation';
import React, { HTMLInputTypeAttribute, useEffect, useState } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";

interface iteminterface {
    _id: string,
    category: string,
    amount: number,
    description: string,
    date: string
}

function Box({ item }: { item: iteminterface }) {
    const categories = ["Stationary", "Groceries", "Entertainment", "Transport", "Health & Wellness", "Dining", "Subscriptions", "Electronics", "Education", "Rent", "Utilities", "Shopping", "Personal Care", "Travel", "Insurance", "Miscellaneous"];
    const [loading, setloading] = useState<boolean>(false)
    const { setexpenses } = useArray()
    const [edit, setedit] = useState<boolean>(false)
    const [update, setupdate] = useState<iteminterface>({ _id: "", amount: 0, description: "", category: "", date: "" })

    const getdate = (date: string) => {
        const newdate = new Date(date)
        const year = newdate.getFullYear()
        const month = newdate.getMonth()
        const day = newdate.getDate()
        return `${day}-${month + 1}-${year}`
    }

    const deleteitem = async (id: string) => {
        setloading(true)
        const response = await fetch("https://finance-tracker-czkp.vercel.app/server", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify({ id: id })
        })
        setloading(false)

        if (!response.ok)
            redirect('/error')

        const data = await response.json()

        if (!data.success)
            redirect('/error')

        setexpenses(data.data)
    }

    const changedata = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setupdate((prev) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        if (item) {
            setupdate({
                _id: item._id,
                category: item.category,
                amount: item.amount,
                description: item.description,
                date: item.date.split("T")[0]
            })
        }
    }, [item]) // Add item as a dependency to update whenever item changes

    const updatedata = async () => {
        setedit(false)

        if (update.amount === 0)
            return alert("Enter all data")
        if (update.description === "")
            return alert("Enter all data")

        setloading(true)
        const response = await fetch("https://finance-tracker-czkp.vercel.app/server", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        })
        setloading(false)

        if (!response.ok)
            redirect('/error')

        const data = await response.json()

        if (!data.success)
            redirect('/error')

        setexpenses(data.data)
    }

    if (!edit)
        return (
            <div className='lg:w-64 md:w-80 sm:w-72 md:mb-5 mb-2 w-full py-2 px-3 text-black border-[1px] border-black rounded-md bg-slate-200'>
                <div className='flex justify-between'>
                    <h1>₹{item.amount}</h1>
                    <h1 className='text-slate-700'>{getdate(item.date)}</h1>
                </div>
                <h1 className='text-slate-700 '><i>{item.category}</i></h1>
                <p className='text-slate-600 break-words'>{item.description}</p>
                <h1 className='icons flex justify-end gap-5 w-full'>
                    <MdEdit onClick={() => setedit(true)} />
                    <MdOutlineDeleteOutline onClick={() => deleteitem(item._id)} />
                </h1>
            </div>
        )
    else
        return (
            <div className='lg:w-64 md:w-80 sm:w-72 md:mb-5 mb-2 w-full py-2 px-3 text-black border-[1px] flex flex-col gap-2 border-black rounded-md bg-slate-200'>
                <select name="category" id="category" value={update.category} onChange={(e) => {
                    const { name, value } = e.target
                    setupdate((prev) => {
                        return { ...prev, name: value }
                    })
                }}>
                    {categories.map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
                <input type="number" name='amount' min={0} value={update.amount} onChange={changedata} placeholder='Enter amount' />
                <input type="date" name='date' value={update.date} onChange={changedata} />
                <input type="text" name='description' className='w-full focus:outline-none px-1' onChange={changedata} value={update.description} />
                <div className='w-full flex justify-end gap-5'>
                    <button className='text-sm' onClick={() => setedit(false)}>Cancel</button>
                    <button className='bg-teal-300 text-white px-2 text-sm' onClick={updatedata}>Update</button>
                </div>
            </div >
        )
}

export default Box;
