import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Container from "@/components/shared/Container";
import LoginForm from "@/components/forms/LoginForm";

const RegisterPage = () => {
  return (
    <section className="min-h-screen bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 py-8 md:py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Info Section */}
          <div className="hidden lg:flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary">
                Join KinCare
              </h2>
              <p className="text-lg text-gray-600">
                Your Trusted Healthcare Partner
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <AiOutlineUser className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Easy Registration
                  </h3>
                  <p className="text-sm text-gray-600">
                    Simple and secure registration process
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg mt-1">
                  <AiOutlineLock className="text-secondary text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure & Safe</h3>
                  <p className="text-sm text-gray-600">
                    Your data is encrypted and protected
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-lg mt-1">
                  <AiOutlineMail className="text-accent text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Access</h3>
                  <p className="text-sm text-gray-600">
                    Get instant access to healthcare services
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 mb-8">
                Fill in your details to get started
              </p>

              <LoginForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RegisterPage;
