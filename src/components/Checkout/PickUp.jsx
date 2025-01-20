import React from "react";

const PickUp = ({ items }) => {
  return (
    <div className="w-full mx-auto">
      <div className="flex items-center mb-4">
        <h2 className="text-base sm:text-lg font-bold">Penjemputan E-Waste</h2>
      </div>

      <div className="p-4 bg-gray-100 rounded-md shadow-sm">
        {items.length === 0 ? (
          <p className="text-gray-500">Tidak ada item yang dipilih untuk penjemputan.</p>
        ) : (
          items.map((item) => (
            <div key={item.waste_id} className="border-b-2 border-gray-300 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Gambar Produk */}
                <img
                  src={item.image || "/images/default.png"}
                  alt={item.waste_name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-contain"
                />
                {/* Detail Produk */}
                <div className="flex flex-col sm:flex-row justify-between w-full">
                  <p className="font-semibold text-sm sm:text-base">
                    {item.waste_name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {item.quantity} x {item.point} Points
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PickUp;
