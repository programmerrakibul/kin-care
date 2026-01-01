import { getServiceById } from "@/app/actions/server/api";
import Container from "@/components/shared/Container";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaLanguage,
  FaGraduationCap,
  FaCertificate,
  FaShieldAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { MdWorkHistory } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

const ServiceDetailsPage = async ({ params }) => {
  const { service_id } = await params;
  const service = await getServiceById(service_id);

  if (!service) {
    return (
      <section className="min-h-screen bg-gray-50 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Service Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The service you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link href="/services" className="btn btn-primary">
              Browse Services
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const {
    name,
    description,
    image,
    rating,
    reviewsCount,
    category,
    responseTime,
    hourlyRate,
    experience,
    location,
    languages = [],
    certifications = [],
    specialties = [],
    verified,
    backgroundChecked,
    available,
  } = service;

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <Container>
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href={`/services?category=${category}`}>{category}</Link>
            </li>
            <li className="font-semibold text-primary">{name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image and Basic Info */}
          <div>
            {/* Service Image */}
            <div className="relative h-100 lg:h-125 rounded-2xl overflow-hidden shadow-lg mb-6">
              <Image
                fill={true}
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              {available && (
                <div className="absolute top-4 left-4">
                  <span className="badge badge-success badge-lg text-white">
                    Available Now
                  </span>
                </div>
              )}
            </div>

            {/* Rating & Reviews */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 text-xl" />
                  <span className="text-2xl font-bold ml-2">{rating}</span>
                </div>
                <span className="text-gray-500">/ 5.0</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaStar className="text-gray-400" />
                <span>{reviewsCount} reviews</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <BiTimeFive className="text-gray-400" />
                <span>{responseTime}</span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="badge badge-outline badge-lg px-4 py-2">
                {category}
              </span>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl font-bold text-primary">
                  ${hourlyRate}
                  <span className="text-lg text-gray-500">/hour</span>
                </div>
                {verified && (
                  <div className="tooltip" data-tip="Verified Provider">
                    <FaCheckCircle className="text-green-500 text-2xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                {description}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold">{location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MdWorkHistory className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold">{experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FaLanguage className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Languages</p>
                  <p className="font-semibold">{languages.join(", ")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FaShieldAlt className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Background Check</p>
                  <p className="font-semibold">
                    {backgroundChecked ? "Completed" : "Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Book Service Button */}
            <Link href={`/booking/${service_id}`}>
              <Button className="btn-block">
                <FaCalendarCheck className="text-xl" />
                Book Service Now
              </Button>
            </Link>

            {/* Response Time Info */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                <FaClock className="text-gray-400" />
                Average response time: {responseTime}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="card bg-white shadow-sm rounded-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GiSkills className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="card-title text-xl">Specialties</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="badge badge-outline badge-lg px-4 py-2"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="card bg-white shadow-sm rounded-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaCertificate className="text-green-600 text-2xl" />
                  </div>
                  <h3 className="card-title text-xl">Certifications</h3>
                </div>
                <ul className="space-y-2">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaGraduationCap className="text-gray-400" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Service Highlights */}
          <div className="card bg-white shadow-sm rounded-xl">
            <div className="card-body">
              <h3 className="card-title text-xl mb-4">Service Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span>Professional and experienced provider</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span>Safe and secure service</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span>Flexible scheduling options</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span>Quality guaranteed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Preview */}
        {reviewsCount > 0 && (
          <div className="card bg-white shadow-sm rounded-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">
                Customer Reviews ({reviewsCount})
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <div className="rating rating-lg">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-yellow-400"
                        checked={i < Math.floor(rating)}
                        readOnly
                      />
                    ))}
                  </div>
                  <span className="text-3xl font-bold ml-4">{rating}</span>
                </div>
              </div>
              <p className="text-gray-600">
                Rated {rating} out of 5 based on {reviewsCount} customer reviews
              </p>
              <div className="card-actions justify-end mt-4">
                <Button>View All Reviews</Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ServiceDetailsPage;
