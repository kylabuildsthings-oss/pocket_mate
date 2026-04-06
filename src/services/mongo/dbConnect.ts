import _mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import { getRequiredEnv } from "@/lib/env";

dotenv.config();

const MONGODB_URI = getRequiredEnv("MONGODB_URI");

interface GlobalMongoose {
  conn: typeof _mongoose | null;
  promise: ReturnType<typeof connect> | null;
}

declare const global: {
  mongoose: GlobalMongoose;
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("=> using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("=> new database connection");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
