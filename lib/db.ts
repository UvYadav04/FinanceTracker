import mongoose from 'mongoose'

type ConnectionObject = {
    isConnected?: number
}


const connection: ConnectionObject = {}
async function connectdb(): Promise<void> {
    try {
        if (connection.isConnected) {
            console.log("already connected")
            return
        }

        const newconnection = await mongoose.connect(process.env.MONGO_URL || '')
        connection.isConnected = newconnection.connections[0].readyState
        console.log("database connected")

    } catch (error) {
        console.log(error)
        console.log("error in connecting db")
        // process.exit(1)
    }
}

export default connectdb