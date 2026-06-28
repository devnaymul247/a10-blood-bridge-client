import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('Blood_Bridge');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        defaultValue: "donor"
      },
      isBlocked: {
        defaultValue: false
      },
      bloodGroup: {
        type: "string",
        required: false,
      },
      photo: {
        type: "string",
        required: false,
      },
    }
  },
});