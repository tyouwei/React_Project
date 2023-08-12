import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('DB is alr connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"text_data",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('DB connection established');
    } catch(error) {
        console.log(error);
    }
}