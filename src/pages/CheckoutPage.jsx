import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Address from "../components/Checkout/Address";
import Summary from "../components/Checkout/Summary";
import Schedule from "../components/Checkout/Schedule";
import PickUp from "../components/Checkout/PickUp";

const CheckoutPage = () => {
  const { state } = useLocation(); // Menerima state dari CartPage
  const selectedItems = state?.selectedItems || []; // Ambil item yang dipilih dari state

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("08:00");
  const [totalEWaste, setTotalEWaste] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const now = new Date(); // Waktu sekarang
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Hari ini (tanpa jam)

    // Jika waktu sudah lewat jam 15:00, set minimum tanggal ke besok
    if (now.getHours() >= 15) {
      today.setDate(today.getDate() + 1); // Tambahkan 1 hari
    }

    const max = new Date();
    max.setDate(today.getDate() + 7); // Maksimum 7 hari ke depan

    const formatDate = (date) => date.toISOString().split("T")[0];

    setMinDate(formatDate(today)); // Atur tanggal minimum
    setMaxDate(formatDate(max)); // Atur tanggal maksimum
  }, []);

  // Hitung Total E-Waste dan Total Points berdasarkan item yang dipilih
  useEffect(() => {
    const totalEWaste = selectedItems.reduce((total, item) => total + item.quantity, 0);
    const totalPoints = selectedItems.reduce((total, item) => total + item.point, 0);
    setTotalEWaste(totalEWaste);
    setTotalPoints(totalPoints);
  }, [selectedItems]);

  return (
    <div className="bg-gray-50 min-h-screen p-8 pt-32">
      <h2 className="text-2xl font-bold mb-5 ml-24">Penjemputan</h2>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Address />
          <PickUp
            items={selectedItems} // Kirim item yang dipilih
            onUpdateTotalEwaste={setTotalEWaste}
            onUpdateTotalPoints={setTotalPoints}
          />
        </div>
        <div className="space-y-6">
        <Schedule
            minDate={minDate}
            maxDate={maxDate}
            pickupDate={pickupDate}
            setPickupDate={setPickupDate}
            pickupTime={pickupTime}
            setPickupTime={setPickupTime}
          />
          
          <Summary
            totalEWaste={totalEWaste}
            totalPoints={totalPoints}
            pickupDate={pickupDate}
            pickupTime={pickupTime}
            selectedItems={selectedItems} // Tambahkan ini
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
