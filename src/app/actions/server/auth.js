"use server";

import { collections, connectDB } from "@/lib/connectDB";
import bcrypt from "bcryptjs";

const usersCollection = collections.USERS;

export const getUser = async (email) => {
  if (!email) {
    return null;
  }

  try {
    const user = await connectDB(usersCollection).findOne({ email });

    return user;
  } catch (err) {
    console.error("Error in getUser:", err);
    return null;
  }
};

export const postUser = async (payload) => {
  if (!payload || !payload.email) {
    return null;
  }

  const today = new Date();
  const createdAt = today.toISOString();

  payload.createdAt = createdAt;

  try {
    const isExist = await getUser(payload.email);

    if (!!isExist) {
      return null;
    }

    if (!payload.provider) {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;
      payload.provider = "credentials";
    }

    const result = await connectDB(usersCollection).insertOne(payload);

    return { ...result, insertedId: JSON.stringify(result.insertedId) };
  } catch (err) {
    console.error("Error in postUser:", err);
    throw err;
  }
};

export const loginUser = async (credentials) => {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  try {
    const user = await getUser(credentials.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (err) {
    console.error("Error in authorize:", err);
    return null;
  }
};
