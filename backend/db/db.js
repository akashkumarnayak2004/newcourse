import mongoose from "mongoose";

const DB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
export default DB;