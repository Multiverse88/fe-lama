import React from "react";
import { BiTime } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { MdDoneAll } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";

const StatusOrder = ({ pickupStatus }) => {
  const steps = [
    { label: "Menunggu Penjemputan", icon: <BiTime /> },
    { label: "Dalam Perjalanan", icon: <FaTruck /> },
    { label: "Sampah Telah Dijemput", icon: <FiCheckCircle /> },
    { label: "Pesanan Selesai", icon: <MdDoneAll /> },
    { label: "Penjemputan Gagal", icon: <AiOutlineCloseCircle /> },
  ];

  const statusMap = {
    "Menunggu Penjemputan": 1,
    "Dalam Perjalanan": 2,
    "Sampah Telah Dijemput": 3,
    "Pesanan Selesai": 4,
    "Penjemputan Gagal": 5,
  };

  const currentStatus = statusMap[pickupStatus] || 0;

  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex items-center justify-center rounded-full w-10 h-10 border-2 ${
              currentStatus >= index + 1
                ? "bg-green-500 text-white"
                : "bg-white text-gray-400"
            }`}
            title={step.label}
          >
            {step.icon}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-grow h-1 ${
                currentStatus > index + 1 ? "bg-green-500" : "bg-gray-400"
              } rounded-full`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusOrder;