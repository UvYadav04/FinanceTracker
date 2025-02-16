import connectdb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import expenses from '../../models/expense';

export async function GET(req: NextRequest) {
    try {
        await connectdb();
        const alldata = await expenses.find({});
        return NextResponse.json({ success: true, data: alldata });
    } catch (error) {
        return NextResponse.json({ success: false });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectdb();
        const data = await req.json();
        const newexpense = new expenses(data);
        await newexpense.save();
        const alldata = await expenses.find({});
        return NextResponse.json({ success: true, data: alldata });
    } catch (error) {
        return NextResponse.json({ success: false });
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectdb();
        const data = await req.json();
        await expenses.findOneAndUpdate({ _id: data._id }, data);
        const alldata = await expenses.find({});
        return NextResponse.json({ success: true, data: alldata });
    } catch (error) {
        return NextResponse.json({ success: false });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectdb();
        const data = await req.json();
        await expenses.findOneAndDelete({ _id: data.id });
        const alldata = await expenses.find({});
        return NextResponse.json({ success: true, data: alldata });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false });
    }
}
