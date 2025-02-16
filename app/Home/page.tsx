'use client'
import Dashboard from '@/Components/Dashboard/Dashboard'
import Navbar from '@/Components/Header/Navbar'
import LandingChart from '@/Components/LandingChart/LandingChart'
import Loader from '@/Components/Loader/Loader'
import { useArray } from '@/ContextProvider/Chartdata'
import { redirect } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

import { Transaction } from '../../Components/Dashboard/Dashboard'

function page() {
    const [loading, setloading] = useState<boolean>(false)
    const [datagot, setgot] = useState<boolean>(false)
    const { expenses, setexpenses } = useArray()
    const [data, setdata] = useState<Transaction[]>([])
    const getdata = async () => {
        // alert("getting data")
        setloading(true)
        const response = await fetch("https://finance-tracker-91za.vercel.app/server", {
            method: "GET"
        })
        setloading(false)

        if (!response.ok) {
            console.log(response)
            console.log("problem in response")
            redirect("/error")
        }

        const data = await response.json()

        if (!data.success) {
            console.log(data)
            redirect("/error")
        }

        // console.log(data)

        setexpenses(data.data)
        setdata(data.data)
        setgot(true)
    }
    useEffect(() => {
        getdata()
    }, [])

    // console.log(e`xpenses)

    if (loading)
        return <Loader />
    return (
        <div className='homepage w-full p-0 flex flex-col'>
            <Navbar />
            {
                datagot ? (
                    <>
                        <LandingChart chart={data} />
                        <Dashboard />
                    </>
                ) : null
            }
        </div>
    )
}

export default page
