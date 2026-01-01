"use client";

import { FaStar, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";

const ServiceCard = ({ service }) => {
  const router = useRouter();
  const {
    name,
    description,
    image,
    rating,
    category,
    responseTime,
    experience,
    verified,
    available,
    _id,
  } = service || {};

  return (
    <div
      onClick={() => router.push(`/services/${_id}`)}
      className="card card-compact lg:card-normal bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden group cursor-pointer"
    >
      {/* Image Container */}
      <figure className="relative h-36 md:h-44 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill={true}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Availability Badge */}
        {available && (
          <div className="absolute top-3 right-3">
            <div className="badge badge-success gap-1 text-white border-0 px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              Available
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <div className="badge badge-primary badge-outline px-3 py-2 backdrop-blur-sm bg-white/30">
            {category}
          </div>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-5 md:p-6">
        {/* Header with Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="card-title text-lg md:text-xl font-bold text-gray-900 line-clamp-1">
                {name}
              </h3>
              {verified && (
                <div className="tooltip" data-tip="Verified Provider">
                  <FaCheckCircle className="text-green-500 text-lg" />
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold ml-1">{rating}</span>
              </div>
              <span className="text-gray-500 text-sm">/ 5.0</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
