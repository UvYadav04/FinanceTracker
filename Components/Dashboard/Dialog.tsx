import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import React, { useState } from "react"
import { redirect } from "next/navigation"
import Loader from "../Loader/Loader"
import { useArray } from "@/ContextProvider/Chartdata"

interface data {
    amount: number,
    description: string,
    category: string,
    date: string
}
export function DialogDemo() {
    const categories = [
        "Stationary",
        "Groceries",
        "Entertainment",
        "Transport",
        "Health & Wellness",
        "Dining",
        "Subscriptions",
        "Electronics",
        "Education",
        "Rent",
        "Utilities",
        "Shopping",
        "Personal Care",
        "Travel",
        "Insurance",
        "Miscellaneous"
    ];
    const { expenses, setexpenses } = useArray()
    const [newdata, setnewdata] = useState<data>({ amount: 0, description: "", category: "", date: "" });
    const [loading, setloading] = useState<boolean>(false)
    const changedata = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setnewdata((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const [errorindex, setindex] = useState<number>(-1)

    const enableerror = (index: number) => {
        setTimeout(() => {
            setindex(-1)
        }, 3000);
        setindex(index)
    }

    const addnewdata = async () => {
        if (newdata.category === "")
            return enableerror(4)
        if (newdata.amount === 0)
            return enableerror(0)
        if (newdata.description === "")
            return enableerror(1)
        if (newdata.date === "")
            return enableerror(2)
        setloading(true)
        const response = await fetch("https://finance-tracker-czkp.vercel.app/server", {
            method: "POST",
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(newdata)
        })
        setloading(false)

        if (!response.ok)
            redirect('/error')

        const data = await response.json()

        if (!data.success)
            redirect('/error')

        // console.log(data)

        alert("successfully added ")
        setexpenses(data.data)
    }

    if (loading)
        return <Loader />


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new Expense</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-end gap-4">
                        <Select
                            name="category"
                            value={newdata.category}
                            onValueChange={(value) => {
                                setnewdata((prev) => ({
                                    ...prev,
                                    category: value, // Set the selected category
                                }));
                            }}                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={errorindex === 4 ? <p className="text-red-500">required</p> : "Category"}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-left">
                            {errorindex === 0 ? <p className="text-red-500">required</p> : "Amount"}
                        </Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            value={newdata.amount}
                            onChange={changedata}
                            className="col-span-3"
                            min={1}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-left">
                            {errorindex === 1 ? <p className="text-red-500">required</p> : "Description"}
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            type="text"
                            value={newdata.description}
                            onChange={changedata}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-left">
                            {errorindex === 2 ? <p className="text-red-500">required</p> : "Date"}
                        </Label>
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            value={newdata.date}
                            onChange={changedata}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => addnewdata()} type="submit">Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
