"use server";

import { collections, connectDB } from "@/lib/connectDB";
import { generateBookingID } from "@/utils/generateBookingID";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const bookingID = generateBookingID();

export const getCategories = async () => {
  try {
    const res = await connectDB(collections.SERVICES).find({}).toArray();

    const filteredRes = [...new Set(res.map((item) => item.category))].map(
      (category, index) => ({ _id: index + 1, name: category })
    );

    return filteredRes;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return null;
  }
};

export const getServices = async () => {
  try {
    const res = await connectDB(collections.SERVICES).find({}).toArray();

    const services = res.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return services;
  } catch (err) {
    console.error("Error fetching services:", err);
    return [];
  }
};

export const getServiceById = async (serviceId) => {
  if (!serviceId || serviceId.length !== 24) {
    return {};
  }

  try {
    const service = await connectDB(collections.SERVICES).findOne({
      _id: new ObjectId(serviceId),
    });

    return { ...service, _id: service._id.toString() };
  } catch (err) {
    console.error("Error fetching service by ID:", err);
    return {};
  }
};

export const postBooking = async (payload) => {
  if (!payload) {
    return null;
  }

  payload.createdAt = new Date().toISOString();
  payload.bookingID = bookingID;
  payload.status = "pending";

  try {
    const result = await connectDB(collections.BOOKINGS).insertOne(payload);
    return {
      ...result,
      insertedId: result.insertedId.toString(),
      bookingID,
    };
  } catch (err) {
    console.error("Error posting booking:", err);
    return null;
  }
};

export const getBookingsByUserEmail = async (email) => {
  if (!email) {
    return [];
  }

  try {
    const bookings = await connectDB(collections.BOOKINGS)
      .find({ customerEmail: email })
      .toArray();

    return bookings.map((booking) => ({
      ...booking,
      _id: booking._id.toString(),
    }));
  } catch (err) {
    console.error("Error fetching bookings by user email:", err);
    return [];
  }
};

export const updateBookingStatus = async (id, status) => {
  if (!id || id.length !== 24 || !status) {
    return null;
  }

  try {
    const result = await connectDB(collections.BOOKINGS).updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    revalidatePath("/my-bookings");

    return result;
  } catch (err) {
    console.error("Error updating booking status:", err);
    return null;
  }
};
