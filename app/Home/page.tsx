'use client'
import Dashboard from '@/Components/Dashboard/Dashboard'
import Navbar from '@/Components/Header/Navbar'
import LandingChart from '@/Components/LandingChart/LandingChart'
import Loader from '@/Components/Loader/Loader'
import { useArray } from '@/ContextProvider/Chartdata'
import { redirect } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function page() {
    const [loading, setloading] = useState<boolean>(false)
    const [datagot, setgot] = useState<boolean>(false)
    const { expenses, setexpenses } = useArray()
    const [data, setdata] = useState<Array<Object>>([])
    const getdata = async () => {
        setloading(true)
        const response = await fetch("http://localhost:3000/server", {
            method: "GET"
        })
        setloading(false)

        if (!response.ok)
            redirect("/error")

        const data = await response.json()

        if (!data.success)
            redirect("/error")

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
