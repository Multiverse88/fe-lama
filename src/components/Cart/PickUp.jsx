import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  fetchCartItems,
  addItemToCart,
  decreaseItemInCart,
  deleteItemFromCart,
} from "../../services/cartService";

const PickUp = ({ onUpdateTotalEwaste, onUpdateCheckedItems }) => {
  const [cartItems, setCartItems] = useState([]); // State untuk menyimpan data keranjang
  const [checkedItems, setCheckedItems] = useState([]); // State untuk menyimpan item yang dicentang
  const [showConfirm, setShowConfirm] = useState(false); // State untuk modal konfirmasi
  const [showAlert, setShowAlert] = useState(false); // State untuk alert
  const [fadeAlert, setFadeAlert] = useState(false); // State untuk animasi fade alert
  const [selectedItem, setSelectedItem] = useState(null); // Item yang dipilih untuk dihapus

  // Fungsi untuk mendapatkan data keranjang dari backend
  const fetchItems = async () => {
    try {
      const items = await fetchCartItems();
      setCartItems(Array.isArray(items) ? items : []); // Validasi apakah hasilnya array
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  // Mengambil data keranjang saat pertama kali komponen dimuat
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setCheckedItems([]); // Kosongkan state jika keranjang kosong
      onUpdateCheckedItems([]); // Update ke parent
    }
  }, [cartItems]);

  // Menangani checkbox per item
  const handleCheckboxChange = (item, isChecked) => {
    let updatedCheckedItems;
    if (isChecked) {
      updatedCheckedItems = [...checkedItems, item]; // Tambahkan item ke daftar checked
    } else {
      updatedCheckedItems = checkedItems.filter(
        (i) => i.waste_id !== item.waste_id
      ); // Hapus item dari daftar checked
    }
    setCheckedItems(updatedCheckedItems);
    onUpdateCheckedItems(updatedCheckedItems); // Kirim data ke komponen induk
  };

  // Menangani checkbox "Pilih Semua"
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allItems = cartItems.slice(); // Salin semua item ke array baru
      setCheckedItems(allItems); // Perbarui checkedItems
      onUpdateCheckedItems(allItems); // Kirim ke parent
    } else {
      setCheckedItems([]); // Kosongkan checkedItems
      onUpdateCheckedItems([]); // Kosongkan parent
    }
  };

  // Hitung total e-waste berdasarkan item yang dicentang
  useEffect(() => {
    const totalCheckedEwaste = checkedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    onUpdateTotalEwaste(totalCheckedEwaste); // Kirim total ke komponen Summary
  }, [checkedItems, onUpdateTotalEwaste]);

  // Fungsi untuk menambah jumlah item
  const increment = async (item) => {
    try {
      await addItemToCart(item.waste_id, 1);
      fetchItems(); // Refresh data keranjang setelah update
    } catch (error) {
      console.error("Error incrementing item:", error);
    }
  };

  // Fungsi untuk mengurangi jumlah item
  const decrement = async (item) => {
    try {
      if (item.quantity > 1) {
        await decreaseItemInCart(item.waste_id, 1);
      } else {
        handleDelete(item); // Tampilkan modal konfirmasi jika jumlah 1
      }
      fetchItems(); // Refresh data keranjang setelah update
    } catch (error) {
      console.error("Error decrementing item:", error);
    }
  };

  // Fungsi untuk menangani klik tombol hapus
  const handleDelete = (item) => {
    setSelectedItem(item); // Simpan item yang akan dihapus
    setShowConfirm(true); // Tampilkan modal konfirmasi
  };

  // Fungsi untuk menghapus item setelah konfirmasi
  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        await deleteItemFromCart(selectedItem.waste_id); // Hapus item dari keranjang
        fetchItems(); // Refresh data keranjang setelah penghapusan

        setShowAlert(true); // Tampilkan alert sukses
        setFadeAlert(true);

        setTimeout(() => {
          setFadeAlert(false);
          setTimeout(() => setShowAlert(false), 500);
        }, 1000);
      } catch (error) {
        console.error("Error confirming delete:", error);
      }
    }
    setShowConfirm(false); // Tutup modal konfirmasi
  };

  // Fungsi untuk membatalkan penghapusan
  const cancelDelete = () => {
    setShowConfirm(false); // Tutup modal konfirmasi
  };

  return (
    <div className="flex-1 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="border-b border-gray-300 py-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-xl w-4 h-6"
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={
              checkedItems.length === cartItems.length && cartItems.length > 0
            }
          />
          <span className="ml-4 sm:ml-4 text-gray-700 text-sm sm:text-base">
            Pilih Semua <span className="text-gray-400">({cartItems.length})</span>
          </span>
        </label>
      </div>

      <div className="mt-4">
        {cartItems.map((item) => (
          <div
            key={item.waste_id}
            className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-300 py-4 space-y-4 sm:space-y-0 justify-between"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbo text-xl w-4 h-6 sm:mr-3"
                onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                checked={checkedItems.some((i) => i.waste_id === item.waste_id)}
              />
              <img
                src={item.image || "/images/default.png"} // Gambar default jika tidak tersedia
                alt={item.waste_name}
                className="w-16 h-16 sm:mr-4 object-contain"
              />
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                {item.waste_name}
              </p>
            </div>

            <div className="flex items-center ml-auto">
              <button
                onClick={() => handleDelete(item)}
                className="p-1 text-gray-500 hover:text-red-500 transition duration-200"
              >
                <AiOutlineDelete size={24} />
              </button>

              <div className="flex items-center border border-primary rounded-full w-24 h-10 justify-between px-2 ml-4">
                <button
                  onClick={() => decrement(item)}
                  className="text-primary text-lg font-bold hover:text-primary-dark transition duration-200"
                >
                  -
                </button>
                <span className="text-gray-800 text-sm sm:text-base">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increment(item)}
                  className="text-primary text-lg font-bold hover:text-primary-dark transition duration-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-center p-6 sm:p-10 rounded-xl shadow-lg">
            <p className="text-lg sm:text-xl font-semibold">Apakah Anda yakin?</p>
            <p className="text-sm sm:text-md mb-6">
              Ingin menghapus e-waste ini:{" "}
              <strong>{selectedItem?.waste_name}</strong>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition duration-200"
              >
                Ya, Hapus
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-400 transition duration-200"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Sukses */}
      {showAlert && (
        <div
          className={`fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transition-all duration-500 ease-out z-50 ${
            fadeAlert ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-semibold text-sm sm:text-base">
            E-waste berhasil dihapus!
          </p>
        </div>
      )}
    </div>
  );
};

export default PickUp;
