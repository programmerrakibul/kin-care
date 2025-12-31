import Container from "@/components/shared/Container";
import { getServices } from "../actions/server/api";
import ServiceCard from "@/components/ui/ServiceCard";

const ServicesPage = async () => {
  const services = await getServices();

  console.log(services);

  return (
    <>
      <section>
        <Container>
          <h1 className="text-4xl font-bold text-center mt-20 mb-10">
            Welcome to KinCare - Your Trusted Home Care Partner
          </h1>

          <div className="grid grid-cols-4 gap-7">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ServicesPage;
