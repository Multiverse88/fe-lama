import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import { fetchPickupHistory } from "../../services/orderService"; // Import the API service

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const data = await fetchPickupHistory();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching pickup history:", error);
      }
    };

    getHistoryData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const sortedData = [...historyData].sort((a, b) => {
    const dateA = new Date(a.pickup_date);
    const dateB = new Date(b.pickup_date);

    return isAscending ? dateA - dateB : dateB - dateA;
  });

  const filteredData = sortedData.filter((order) =>
    order.details.some((product) =>
      product.waste_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      {/* Search and Sort Section */}
      <div className="flex flex-row items-center justify-between mb-4 space-x-2 max-w-lg mx-auto">
        <div className="flex-grow w-full sm:-mt-5 sm:-mb-5 sm:w-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
        <button
          onClick={toggleSortOrder}
          className="text-gray-600 cursor-pointer p-2 bg-gray-100 rounded-md shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {isAscending ? (
            <FaSortAmountUp size={20} />
          ) : (
            <FaSortAmountDownAlt size={20} />
          )}
        </button>
      </div>

      {/* History */}
      <div className="space-y-6 px-0 sm:px-0">
        {filteredData.map((order) => {
          const totalPoints = order.details.reduce(
            (total, product) => total + product.points * product.quantity,
            0
          );

          return (
            <div
              key={order.pickup_id}
              className="p-4 sm:p-6 rounded-lg shadow border border-gray-300"
            >
              {/* Header */}
              <div className="flex sm:flex-row flex-col justify-between items-start sm:justify-between mb-4 space-y-4 sm:space-y-0">
                <h3 className="font-semibold text-sm sm:text-base">
                  Order ID #{order.pickup_id}
                </h3>
                <span className="bg-green-300 text-gray-700 font-semibold text-sm px-3 py-2 rounded-full">
                  {order.pickup_status}
                </span>
              </div>

              {/* Products */}
              {order.details.map((product, index) => (
                <div
                  key={`${product.waste_id}-${index}`}
                  className="border-t border-b py-4 flex flex-col sm:flex-row items-center sm:justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.waste_name}
                    className="w-28 sm:w-32 h-auto object-contain mb-4 sm:mb-0"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">
                    <span className="text-sm sm:text-base font-semibold">
                      {product.waste_name}
                    </span>
                    <span className="text-gray-600 text-sm sm:text-base">
                      {product.quantity} x {product.points} Points
                    </span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 space-y-2 sm:space-y-0">
                <span className="text-sm text-gray-500">{order.pickup_date}</span>
                <span className="font-semibold text-sm sm:text-base">
                  Total Points: {totalPoints} Points
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default History;