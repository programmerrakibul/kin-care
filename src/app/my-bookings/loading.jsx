import Container from "@/components/shared/Container";
import BookingTableSkeleton from "@/components/ui/BookingTableSkeleton";

const loading = () => {
  return (
    <section className="py-12 md:py-16">
      <Container>
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <BookingTableSkeleton />
      </Container>
    </section>
  );
};

export default loading;
