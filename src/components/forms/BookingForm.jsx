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

const BookingForm = () => {
  const { service_id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    try {
      // Simulate API call
      console.log("Booking Data:", {
        ...data,
        serviceID: service_id,
      });

      // Here you would normally send the data to your backend
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...data, service_id })
      // });

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
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
        {/* Success Message */}
        {isSubmitted && (
          <div className="alert alert-success flex items-center gap-3 rounded-xl">
            <FaCheckCircle className="text-xl" />
            <div>
              <p className="font-semibold">Booking submitted successfully!</p>
              <p className="text-sm">We will confirm your booking shortly.</p>
            </div>
          </div>
        )}

        {/* Personal Information Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaUser className="text-blue-600" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name *</Label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg transition"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaInfoCircle /> {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Email Address *
                </span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400 text-lg" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input input-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg pl-12 transition"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaInfoCircle /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Phone Number *
                </span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-4 text-gray-400 text-lg" />
                <input
                  type="tel"
                  placeholder="+880 1XX XXXXXXX"
                  className="input input-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg pl-12 transition"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^(\+880|0)?[1-9]\d{9}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaInfoCircle /> {errors.phone.message}
                </p>
              )}
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
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Preferred Date *
                </span>
              </label>
              <input
                type="date"
                min={today}
                className="input input-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg transition"
                {...register("bookingDate", {
                  required: "Date is required",
                })}
              />
              {errors.bookingDate && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaInfoCircle /> {errors.bookingDate.message}
                </p>
              )}
            </div>

            {/* Booking Time */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Preferred Time *
                </span>
              </label>
              <div className="relative">
                <FaClock className="absolute left-4 top-4 text-gray-400 text-lg" />
                <input
                  type="time"
                  className="input input-bordered border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-lg pl-12 transition"
                  {...register("bookingTime", {
                    required: "Time is required",
                  })}
                />
              </div>
              {errors.bookingTime && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaInfoCircle /> {errors.bookingTime.message}
                </p>
              )}
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
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Region *
                </span>
              </label>
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
              {errors.region && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaInfoCircle /> {errors.region.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  City *
                </span>
              </label>
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
              {errors.city && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaInfoCircle /> {errors.city.message}
                </p>
              )}
            </div>

            {/* Area */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Covered Area *
                </span>
              </label>
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
              {errors.area && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <FaInfoCircle /> {errors.area.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Detailed Address
              </span>
            </label>
            <div className="relative">
              <FaHome className="absolute left-4 top-4 text-gray-400 text-lg" />
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
            {errors.address && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <FaInfoCircle /> {errors.address.message}
              </p>
            )}
          </div>
        </div>

        {/* Additional Notes Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaInfoCircle className="text-blue-600" />
            Additional Information
          </h2>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Special Requests or Notes
              </span>
            </label>
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
