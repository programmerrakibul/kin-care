import Container from "@/components/shared/Container";

const ServiceDetailsLoading = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <Container>
        {/* Breadcrumb Skeleton */}
        <div className="mb-6">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div>
            {/* Image Skeleton */}
            <div className="h-100 lg:h-125 bg-gray-200 rounded-xl animate-pulse mb-6"></div>

            {/* Rating & Reviews Skeleton */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Title Skeleton */}
            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>

            {/* Category Skeleton */}
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

            {/* Price Skeleton */}
            <div className="h-8 w-28 bg-gray-200 rounded animate-pulse mb-6"></div>

            {/* Description Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Features Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Button Skeleton */}
            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Additional Details Skeleton */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 bg-white rounded-xl shadow-sm">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetailsLoading;
