import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const collections = {
  USERS: "users",
  SERVICES: "services",
};

export const connectDB = (cname) => {
  const db = client.db("kin-care");
  return db.collection(cname);
};
