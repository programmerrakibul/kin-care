"use server";

import { collections, connectDB } from "@/lib/connectDB";
import { generateBookingID } from "@/utils/generateBookingID";
import { ObjectId } from "mongodb";

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

    const filteredRes = res.map((item) => ({
      _id: JSON.stringify(item._id),
      ...item,
    }));

    return filteredRes;
  } catch (err) {
    console.error("Error fetching services:", err);
    return null;
  }
};

export const getServiceById = async (serviceId) => {
  if (!serviceId || serviceId.length !== 24) {
    return null;
  }

  try {
    const service = await connectDB(collections.SERVICES).findOne({
      _id: new ObjectId(serviceId),
    });

    return { ...service, _id: JSON.stringify(service._id) };
  } catch (err) {
    console.error("Error fetching service by ID:", err);
    return null;
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
      insertedId: JSON.stringify(result.insertedId),
      bookingID,
    };
  } catch (err) {
    console.error("Error posting booking:", err);
    return null;
  }
};
