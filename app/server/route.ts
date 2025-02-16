import connectdb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import expenses from '../../models/expense'
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        await connectdb()
        const alldata = await expenses.find({})
        // console.log(alldata)
        return NextResponse.json({ success: true, data: alldata })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectdb()
        const data = await req.json()
        // console.log(data)
        const newexpense = new expenses(data)
        await newexpense.save()
        // await expenses.insertMany(data)
        const alldata = await expenses.find({})
        // console.log(alldata)
        return NextResponse.json({ success: true, data: alldata })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}
export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        await connectdb()
        const data = await req.json()
        console.log(data)
        await expenses.findOneAndUpdate({ _id: data.id }, data)
        const alldata = await expenses.find({})
        // console.log(alldata)
        return NextResponse.json({ success: true, data: alldata })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}
export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        await connectdb()
        const data = await req.json()
        // console.log("data : ", data)
        await expenses.findOneAndDelete({ _id: data.id })
        const alldata = await expenses.find({})
        // console.log(alldata)
        return NextResponse.json({ success: true, data: alldata })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}