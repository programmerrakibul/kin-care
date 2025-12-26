import LoginForm from "@/components/forms/LoginForm";
import Container from "@/components/shared/Container";
import Logo from "@/components/ui/Logo";

const LoginPage = () => {
  return (
    <section className="min-h-screen flex items-center py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">Welcome back</h1>

            <p className="text-muted max-w-xl">
              Sign in to your account to manage bookings, view services, and
              access personalized recommendations. Clean, secure, and fast.
            </p>

            <div className="hidden md:block">
              <img
                src="/assets/login-illustration.svg"
                alt="Login illustration"
                className="w-full max-w-sm"
              />
            </div>
          </div>

          <div>
            <div className="max-w-md w-full mx-auto bg-base-100 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Sign in to your account
              </h2>
              <LoginForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
