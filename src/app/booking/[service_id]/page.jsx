import BookingForm from "@/components/forms/BookingForm";
import Container from "@/components/shared/Container";
import { FaPhone, FaEnvelope, FaInfoCircle } from "react-icons/fa";

const BookingPage = () => {
  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-12 md:py-16">
      <Container>
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Book Your Care Service
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Schedule your healthcare service with ease. Fill in your details and
            choose your preferred date and location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <BookingForm />
          </div>

          {/* Sidebar - Information Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-3 bg-white rounded-2xl shadow-lg p-8 space-y-6">
              {/* Quick Tips */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-600" />
                  Quick Tips
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-gray-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Booking must be at least 24 hours in advance</span>
                  </li>
                  <li className="flex gap-3 text-sm text-gray-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>We serve selected coverage areas only</span>
                  </li>
                  <li className="flex gap-3 text-sm text-gray-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>You will receive confirmation via email</span>
                  </li>
                  <li className="flex gap-3 text-sm text-gray-600">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Contact us for urgent bookings</span>
                  </li>
                </ul>
              </div>

              {/* Contact Support */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is here to assist you
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FaPhone className="text-blue-600" />
                    <span className="text-gray-700 font-semibold">
                      +880-1800-123456
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaEnvelope className="text-blue-600" />
                    <span className="text-gray-700 font-semibold break-all">
                      support@kincare.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BookingPage;
