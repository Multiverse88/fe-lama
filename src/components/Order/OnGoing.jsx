import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPickupData } from "../../services/orderService";

const OnGoing = () => {
  const [ordersData, setOrdersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPickupData();
        const groupedData = data.reduce((acc, order) => {
          if (!acc[order.pickup_id]) {
            acc[order.pickup_id] = {
              pickup_id: order.pickup_id,
              pickup_date: order.pickup_date,
              pickup_status: order.pickup_status,
              details: [],
            };
          }
          acc[order.pickup_id].details.push({
            waste_id: order.waste_id,
            quantity: order.quantity,
            points: order.points,
            waste_name: order.waste_name,
            image: order.image,
          });
          return acc;
        }, {});
        setOrdersData(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching pickup data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="space-y-6 px-0 sm:px-0">
      {ordersData.map((order) => {
        const totalPoints = (order.details || []).reduce(
          (total, product) => total + (product.points || 0) * (product.quantity || 0),
          0
        );

        return (
          <div
            key={order.pickup_id}
            className="p-4 sm:p-6 rounded-lg shadow border border-gray-300"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
              <h3 className="font-semibold text-sm sm:text-base sm:ml-20 sm:-indent-20">
                Order ID #{order.pickup_id}
              </h3>
              <div className="flex flex-row justify-between sm:justify-end sm:gap-6 w-full">
                <button
                  className="text-primary font-semibold text-sm sm:text-base bg-blue-50 hover:bg-blue-200 px-3 py-2 rounded-md"
                  onClick={() => navigate(`/TrackPage/${order.pickup_id}`)}
                >
                  Track
                </button>
                <span className="bg-yellow-300 text-gray-700 font-semibold text-xs sm:text-sm px-3 py-2 rounded-full">
                  {order.pickup_status}
                </span>
              </div>
            </div>

            {/* Products */}
            {order.details.map((product) => (
              <div
                key={product.waste_id}
                className="border-t border-b py-4 flex flex-col sm:flex-row items-center sm:justify-between"
              >
                <img
                  src={product.image || '/images/default.png'}
                  alt={product.waste_name || 'Product Image'}
                  className="w-28 sm:w-32 h-auto object-contain mb-4 sm:mb-0"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">
                  <span className="text-sm sm:text-base font-semibold">
                    {product.quantity || 0}
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {product.quantity || 0} x {product.points || 0} Points
                  </span>
                </div>
              </div>
            ))}

            {/* Footer */}
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
  );
};

export default OnGoing;