import React from "react";
import { useNavigate } from "react-router-dom";

const Summary = ({ totalEwaste, checkedItems }) => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    if (checkedItems.length === 0) {
      alert("Silakan pilih setidaknya satu item sebelum melanjutkan.");
      return;
    }
    navigate("/CheckoutPage", { state: { selectedItems: checkedItems } });
  };

  return (
    <div className="flex-1 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-center lg:text-left">
        Ringkasan E-Waste
      </h3>
      <div className="border-t border-gray-300 mt-2 pt-4">
        <div className="flex justify-between text-gray-700 mb-4 text-sm sm:text-base">
          <span>Total E-Waste</span>
          <span>{totalEwaste}</span>
        </div>
      </div>
      <button
        onClick={handleConfirmClick}
        className={`w-full py-2 rounded-md font-semibold text-sm sm:text-base transition ${
          checkedItems.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
        disabled={checkedItems.length === 0} // Disable tombol jika tidak ada item
      >
        Konfirmasi Cart
      </button>
    </div>
  );
};

export default Summary;
