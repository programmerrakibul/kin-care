"use client";

import { useForm, useWatch } from "react-hook-form";
import { useState, useMemo } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { coverageAreas } from "@/data/coverageAreas";
import Button from "../ui/Button";
import { useParams } from "next/navigation";
import Label from "../ui/Label";
import { useSession } from "next-auth/react";
import Input from "../ui/Input";
import ErrorMessage from "../ui/ErrorMessage";
import { getServiceById, postBooking } from "@/app/actions/server/api";
import Swal from "sweetalert2";
import { getAlert } from "@/utils/getAlert";

const BookingForm = () => {
  const { service_id } = useParams();
  const { data } = useSession();
  const user = data?.user || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  // Watch form values using useWatch hook
  const selectedRegion = useWatch({
    control,
    name: "region",
  });

  const selectedCity = useWatch({
    control,
    name: "city",
  });

  const regions = [...new Set(coverageAreas.map((area) => area.region))];

  // Compute cities based on selected region using useMemo
  const cities = useMemo(() => {
    if (selectedRegion) {
      return [
        ...new Set(
          coverageAreas
            .filter((area) => area.region === selectedRegion)
            .map((area) => area.city)
        ),
      ];
    }
    return [];
  }, [selectedRegion]);

  // Compute covered areas based on selected city and region using useMemo
  const coveredAreas = useMemo(() => {
    if (selectedCity && selectedRegion) {
      const areaData = coverageAreas.find(
        (area) => area.region === selectedRegion && area.city === selectedCity
      );
      return areaData?.covered_area || [];
    }
    return [];
  }, [selectedCity, selectedRegion]);

  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      customerName: user?.name,
      customerEmail: user?.email,
      serviceID: service_id,
      serviceHour: Number(data.serviceHour),
    };

    try {
      const { hourlyRate } = await getServiceById(service_id);
      const price = hourlyRate * bookingData.serviceHour;

      const swal = await Swal.fire({
        title: "Confirm Booking",
        html: `<p>You are about to book a service at an hourly rate of <strong>$${price}</strong>.</p>
               <p>Please confirm to proceed with the booking.</p>`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        allowOutsideClick: false,
      });

      if (swal.isConfirmed) {
        bookingData.price = price;
        const res = await postBooking(bookingData);

        if (res.insertedId) {
          getAlert({
            title: "Booking Successful",
            text: `Your booking has been submitted successfully! Your booking ID is ${res.bookingID}.`,
          });
        }
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-10 space-y-8"
      >
        {/* Personal Information Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaUser className="text-blue-600" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name - Display Only */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="input input-bordered border-gray-300 w-full rounded-lg bg-gray-50 flex items-center px-4 py-3 text-gray-700 font-medium">
                <FaUser className="mr-3 text-blue-600" />
                {user?.name || "Not available"}
              </div>
            </div>

            {/* Email - Display Only */}
            <div className="form-control w-full">
              <Label htmlFor="email">Email Address</Label>

              <div className="input input-bordered border-gray-300 w-full rounded-lg bg-gray-50 flex items-center px-4 py-3 text-gray-700 font-medium">
                <FaEnvelope className="mr-3 text-blue-600" />
                {user?.email || "Not available"}
              </div>
            </div>

            {/* Phone */}
            <div className="form-control w-full">
              <Label htmlFor="phone">Phone Number *</Label>

              <div className="relative">
                <FaPhone className="absolute left-4 top-[50%] -translate-y-[50%] text-gray-400 text-lg z-10" />
                <Input
                  type="tel"
                  placeholder="+880 1XX XXXXXXX"
                  className="pl-12"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
              </div>

              <ErrorMessage message={errors.phone?.message} />
            </div>
          </div>
        </div>

        {/* Booking Details Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaCalendarAlt className="text-blue-600" />
            Booking Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Booking Date */}
            <div className="form-control w-full">
              <Label htmlFor="bookingDate">Preferred Date *</Label>

              <Input
                type="date"
                min={today}
                {...register("bookingDate", {
                  required: "Date is required",
                })}
              />

              <ErrorMessage message={errors.bookingDate?.message} />
            </div>

            {/* Booking Time */}
            <div className="form-control w-full">
              <Label htmlFor="bookingTime">Preferred Time *</Label>

              <div className="relative">
                <FaClock className="absolute left-4 top-[50%] -translate-y-[50%] text-gray-400 text-lg z-10" />
                <Input
                  type="time"
                  className="pl-12"
                  {...register("bookingTime", {
                    required: "Time is required",
                  })}
                />
              </div>

              <ErrorMessage message={errors.bookingTime?.message} />
            </div>

            {/* Service Hour */}
            <div className="form-control w-full">
              <Label htmlFor="serviceHour">Service Hour *</Label>

              <div className="relative">
                <FaClock className="absolute left-4 top-[50%] -translate-y-[50%] text-gray-400 text-lg z-10" />
                <Input
                  type="number"
                  className="pl-12"
                  {...register("serviceHour", {
                    required: "Service Hour is required",
                  })}
                />
              </div>

              <ErrorMessage message={errors.serviceHour?.message} />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaMapMarkerAlt className="text-blue-600" />
            Service Location
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Region */}
            <div className="form-control w-full">
              <Label htmlFor="region">Region *</Label>
              <select
                className="select select-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg transition"
                {...register("region", {
                  required: "Region is required",
                })}
              >
                <option value="">Select a region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <ErrorMessage message={errors.region?.message} />
            </div>

            {/* City */}
            <div className="form-control w-full">
              <Label htmlFor="city">City *</Label>
              <select
                className="select select-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg transition"
                disabled={!selectedRegion}
                {...register("city", {
                  required: "City is required",
                })}
              >
                <option value="">
                  {selectedRegion ? "Select a city" : "Select region first"}
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <ErrorMessage message={errors.city?.message} />
            </div>

            {/* Area */}
            <div className="form-control w-full">
              <Label htmlFor="area">Covered Area *</Label>

              <select
                className="select select-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg transition"
                disabled={!selectedCity}
                {...register("area", {
                  required: "Area is required",
                })}
              >
                <option value="">
                  {selectedCity ? "Select an area" : "Select city first"}
                </option>
                {coveredAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <ErrorMessage message={errors.area?.message} />
            </div>
          </div>

          {/* Address */}
          <div className="form-control w-full mt-6">
            <Label htmlFor="address">Detailed Address</Label>

            <div className="relative">
              <FaHome className="absolute left-4 top-3 text-gray-400 text-lg z-10" />
              <textarea
                placeholder="Enter your complete address (house number, street, building name, etc.)"
                className="textarea textarea-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg pl-12 transition resize-none"
                rows="3"
                {...register("address", {
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters",
                  },
                })}
              ></textarea>
            </div>

            <ErrorMessage message={errors.address?.message} />
          </div>
        </div>

        {/* Additional Notes Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaInfoCircle className="text-blue-600" />
            Additional Information
          </h2>

          <div className="form-control w-full">
            <Label htmlFor="additionalNotes">Special Requests or Notes</Label>

            <textarea
              placeholder="Any special requirements or additional information we should know?"
              className="textarea textarea-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg transition resize-none"
              rows="4"
              {...register("additionalNotes")}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <Button className="flex-1">Continue</Button>
          <button
            type="reset"
            className="btn btn-outline btn-error rounded-lg"
            onClick={() => {
              reset();
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
