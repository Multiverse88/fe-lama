import React from "react";

const CourierInfo = () => {
  return (
    <div className="flex flex-col items-center p-4 border-2 rounded-lg mx-auto w-full">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
        <img
          src="/images/hikel.jpg"
          alt="Foto Kurir"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-lg sm:text-xl font-semibold">Nama Kurir</div>
    </div>
  );
};

export default CourierInfo;