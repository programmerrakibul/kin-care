import ServiceCardSkeleton from "@/components/ui/ServiceCardSkeleton";

const loading = () => {
  return (
    <div className="grid grid-cols-4 gap-7">
      {[...Array(6)].map((_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default loading;
