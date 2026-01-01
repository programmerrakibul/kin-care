"use client";

import { updateBookingStatus } from "@/app/actions/server/api";
import { getAlert } from "@/utils/getAlert";
import { FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const BookingCancelButton = ({ status, bookingID }) => {
  const handleCancelBooking = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to cancel this booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
      });

      if (result.isConfirmed) {
        const response = await updateBookingStatus(bookingID, "cancelled");

        if (response.modifiedCount) {
          getAlert({
            title: "Booking Cancelled",
          });
        }
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  return (
    <>
      <button
        disabled={status === "completed" || status === "cancelled"}
        onClick={handleCancelBooking}
        className="btn btn-sm btn-outline btn-error rounded-md gap-1 hover:shadow-md transition-all"
        title="Cancel this booking"
      >
        <FiX className="w-4 h-4" />
        Cancel
      </button>
    </>
  );
};

export default BookingCancelButton;
