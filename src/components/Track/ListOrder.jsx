import React from "react";

const ListOrder = () => {
  const orderStatuses = [
    {
      title: "Menunggu Penjemputan",
      description:
        "Permintaan sudah diterima, menunggu kurir untuk memulai perjalanan.",
    },
    {
      title: "Dalam Perjalanan",
      description: "Kurir sedang menuju lokasi penjemputan.",
    },
    {
      title: "Sampah Telah Dijemput",
      description: "Sampah elektronik telah berhasil dijemput oleh kurir.",
    },
    {
      title: "Pesanan Selesai",
      description:
        "Proses penjemputan selesai dan sampah berhasil diterima di tempat pengolahan.",
    },
    {
      title: "Penjemputan Gagal",
      description:
        "Penjemputan tidak berhasil dilakukan karena alasan tertentu (Barang terlalu banyak).",
    },
  ];

  return (
    <div className="p-4 sm:p-6 border-2 rounded-lg w-full mx-auto">
      <h3 className="text-lg sm:text-xl text-center font-bold mb-10">
        List Order Tracking
      </h3>
      <ul className="space-y-4">
        {orderStatuses.map((status, index) => (
          <li key={index} className="border-b pb-4 last:border-b-0">
            <h4 className="text-sm sm:text-base font-semibold">
              {status.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              {status.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOrder;
