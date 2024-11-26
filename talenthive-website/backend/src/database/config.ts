import mongoose from "mongoose";

const connectToDatabase = async () => {
    const DB = process.env
        .MONGO_URI!.replace("<MONGO_PASSWORD>", process.env.MONGO_PASSWORD!)
        .replace("<MONGO_USER>", process.env.MONGO_USER!);

    mongoose.connect(DB, {}).then(() => console.log("DB connection successful!"));
};

export default connectToDatabase;
