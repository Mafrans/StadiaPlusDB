import mongoose from "mongoose";

export async function connectMongoose(uri: string) {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}