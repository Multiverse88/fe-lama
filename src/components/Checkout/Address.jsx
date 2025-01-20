import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { fetchAddress } from "../../services/checkoutService"; // Import API fetchAddress

const Address = () => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      try {
        const data = await fetchAddress();
        setAddress(data?.address || "Alamat tidak tersedia");
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    getAddress();
  }, []);

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="flex items-center text-primary mb-4">
        <FaLocationDot className="mr-2 text-base sm:text-lg" />
        <h2 className="text-base sm:text-lg font-bold">Alamat Pengiriman</h2>
      </div>

      {/* Konten Alamat */}
      <div className="p-4 bg-gray-100 rounded-md shadow-sm">
        <p className="font-bold text-sm sm:text-base">Nama Penerima</p>
        <p className="text-xs sm:text-sm mt-2">{address}</p>
        <div className="mt-4 space-x-2">
          <button className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
            Ganti Alamat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
