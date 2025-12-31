const ServiceCardSkeleton = () => {
  return (
    <div className="card card-compact lg:card-normal bg-base-100 shadow-xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <figure className="relative h-56 md:h-64 bg-gray-200"></figure>

      {/* Card Body Skeleton */}
      <div className="card-body p-5 md:p-6">
        {/* Title & Rating Skeleton */}
        <div className="mb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
