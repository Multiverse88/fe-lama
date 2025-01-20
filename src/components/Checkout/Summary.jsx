import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { checkout } from "../../services/checkoutService"; // Import service checkout

const Summary = ({ totalEwaste, totalPoints, pickupDate, pickupTime, selectedItems }) => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); // Inisialisasi navigasi

  const handleConfirmClick = async () => {
    const formattedItems = selectedItems.map((item) => item.waste_id); // Ambil hanya waste_id
    console.log("Formatted Items for API:", formattedItems); // Debugging log

    try {
      await checkout({
        pickupDate,
        pickupTime,
        selectedItems: formattedItems, // Kirim formattedItems ke API
      });
      setShowAlert(true);

      // Tutup alert setelah 2 detik dan navigasi ke OrderPage
      setTimeout(() => {
        setShowAlert(false);
        navigate("/OrderPage"); // Navigasi ke halaman OrderPage
      }, 2000);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Terjadi kesalahan saat konfirmasi. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-base sm:text-lg font-bold mb-4">Ringkasan E-Waste</h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm sm:text-base">
          <p>Total E-Waste</p>
          <p>{totalEwaste}</p>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <p>Total Points</p>
          <p>{totalPoints}</p>
        </div>
      </div>

      <button
        onClick={handleConfirmClick}
        className="mt-4 w-full bg-primary text-white py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-primary-dark transition"
      >
        Konfirmasi E-Waste
      </button>

      {showAlert && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mb-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="sm:text-lg text-base font-medium">
              Penjemputan Dikonfirmasi
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
