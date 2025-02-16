import mongoose, { Schema } from "mongoose";


const expenseFinance = new Schema({
    category: String,
    amount: Number,
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
})
const Expense = mongoose.models.myexpenses || mongoose.model('myexpenses', expenseFinance);

export default Expense