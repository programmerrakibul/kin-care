import { getServerSession } from "next-auth";
import { authOptions } from "../actions/server/authOptions";
import { getBookingsByUserEmail } from "../actions/server/api";
import Container from "@/components/shared/Container";

import { FiEye } from "react-icons/fi";
import {
  FaCheckCircle,
  FaHourglassStart,
  FaTimesCircle,
  FaCheck,
} from "react-icons/fa";
import Button from "@/components/ui/Button";
import Link from "next/link";
import BookingCancelButton from "@/components/ui/BookingCancelButton";

const MyBookingsPage = async () => {
  const { user } = await getServerSession(authOptions);
  const bookings = await getBookingsByUserEmail(user?.email);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: FaHourglassStart,
        label: "Pending",
      },
      confirmed: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: FaCheckCircle,
        label: "Confirmed",
      },
      completed: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: FaCheck,
        label: "Completed",
      },
      cancelled: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: FaTimesCircle,
        label: "Cancelled",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full border ${config.bg} ${config.text} ${config.border} w-fit text-sm font-semibold`}
      >
        <Icon className="w-4 h-4" />
        <span>{config.label}</span>
      </div>
    );
  };

  // Empty State
  if (bookings.length === 0) {
    return (
      <section className="py-16 md:py-20 min-h-screen">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
              My Bookings
            </h1>
            <p className="text-gray-600 mb-12">
              You don&apos;t have any bookings yet. Explore our services and
              book one today!
            </p>
            <Link href="/services">
              <Button>Browse Services</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">
            You have{" "}
            <span className="font-semibold text-primary">
              {bookings.length}
            </span>{" "}
            booking{bookings.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="table w-full bg-white">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="text-neutral font-semibold text-sm">
                  Service Name
                </th>
                <th className="text-neutral font-semibold text-sm">Duration</th>
                <th className="text-neutral font-semibold text-sm">
                  Booking ID
                </th>
                <th className="text-neutral font-semibold text-sm">Location</th>
                <th className="text-neutral font-semibold text-sm">
                  Total Cost
                </th>
                <th className="text-neutral font-semibold text-sm">Status</th>
                <th className="text-neutral font-semibold text-sm text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td>
                    <div className="font-medium text-neutral">
                      {booking.serviceName || "Service"}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col text-sm">
                      <span className="text-neutral font-medium">
                        {booking.serviceHour} hours(s)
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="font-mono text-sm font-semibold text-primary">
                      {booking.bookingID}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <div className="text-neutral font-medium">
                        {booking.area}
                      </div>
                      <div className="text-gray-600 text-xs">
                        {booking.city}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold text-primary">
                      ${booking.price || "0.00"}
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={booking.status || "pending"} />
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <Link href={`/services/${booking.serviceID}`}>
                        <Button title="View booking details" className="btn-sm">
                          <FiEye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                      <BookingCancelButton
                        status={booking.status}
                        bookingID={booking._id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};

export default MyBookingsPage;
