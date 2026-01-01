const BookingTableSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-neutral font-semibold">Service Name</th>
            <th className="text-neutral font-semibold">
              Duration
            </th>
            <th className="text-neutral font-semibold">Booking ID</th>
            <th className="text-neutral font-semibold">
              Location
            </th>
            <th className="text-neutral font-semibold">
              Total Cost
            </th>
            <th className="text-neutral font-semibold">Status</th>
            <th className="text-neutral font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b border-gray-200 animate-pulse">
              <td>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </td>
              <td>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
              </td>
              <td className="hidden sm:table-cell">
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
              </td>
              <td className="hidden md:table-cell">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </td>
              <td className="hidden lg:table-cell">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </td>
              <td>
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              </td>
              <td>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTableSkeleton;
