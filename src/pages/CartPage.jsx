import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PickUp from "../components/Cart/PickUp";
import Summary from "../components/Cart/Summary";
import { fetchCartItems } from "../services/cartService";

const CartPage = () => {
  const [totalEwaste, setTotalEwaste] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]); // State untuk item yang dicentang
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

  // Fungsi untuk mengambil data keranjang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchCartItems();
        const totalEwaste = items.reduce((acc, item) => acc + item.quantity, 0); // Hitung total E-Waste
        setTotalEwaste(totalEwaste);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk mengupdate total E-Waste
  const handleUpdateTotalEwaste = (newTotal) => {
    setTotalEwaste(newTotal);
  };

  // Fungsi untuk mengupdate item yang dicentang
  const handleCheckedItems = (items) => {
    setCheckedItems(items);
  };

  // Fungsi untuk navigasi ke halaman Checkout
  const handleCheckout = () => {
    navigate("/CheckoutPage", { state: { selectedItems: checkedItems } });
  };

  return (
    <div className="flex justify-center bg-gray-50 py-8 pt-36">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
          Keranjang
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <PickUp
              onUpdateTotalEwaste={handleUpdateTotalEwaste}
              onUpdateCheckedItems={handleCheckedItems} // Kirim fungsi untuk update item dicentang
            />
          </div>

          <div className="w-full lg:w-1/3">
            <Summary
              totalEwaste={totalEwaste}
              checkedItems={checkedItems} // Kirim item dicentang ke Summary
              onCheckout={handleCheckout} // Kirim fungsi navigasi ke Summary
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
