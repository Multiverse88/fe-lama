import React from "react";

const Schedule = ({
  minDate,
  maxDate,
  pickupDate,
  setPickupDate,
  pickupTime,
  setPickupTime,
}) => {
  // Membuat daftar waktu dari 08:00 hingga 14:00
  const timeOptions = Array.from({ length: 7 }, (_, index) => {
    const hour = 8 + index; // Mulai dari jam 8
    return `${hour.toString().padStart(2, "0")}:00`; // Format waktu
  });

  const handleDateChange = (e) => {
    setPickupDate(e.target.value); // Update tanggal di parent
  };

  const handleTimeChange = (e) => {
    setPickupTime(e.target.value); // Update waktu di parent
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-base sm:text-lg font-bold mb-4">Jadwal Penjemputan</h2>

      <div className="space-y-4">
        {/* Input untuk tanggal */}
        <div>
          <label
            htmlFor="pickupDate"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Tanggal Penjemputan
          </label>
          <input
            type="date"
            id="pickupDate"
            value={pickupDate}
            onChange={handleDateChange}
            min={minDate} // Batas minimum tanggal
            max={maxDate} // Batas maksimum tanggal
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
          />
        </div>

        {/* Dropdown untuk waktu */}
        <div>
          <label
            htmlFor="pickupTime"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Waktu Penjemputan
          </label>
          <select
            id="pickupTime"
            value={pickupTime}
            onChange={handleTimeChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
          >
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
