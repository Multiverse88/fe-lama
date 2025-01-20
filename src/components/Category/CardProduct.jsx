import React, { useState } from "react";
import { addItemToCart } from '../../services/cartService'; // Hapus DUMMY_PICKUP_ID

const Card = ({ title, points, image, bgImage, onAddToCart, wasteId }) => {
  return (
    <div className="w-full mx-3">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-80 sm:w-64 flex flex-col items-center">
        {/* Background */}
        <div
          className="relative w-full h-52"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={image}
            alt={title}
            className="absolute top-5 left-1/2 transform -translate-x-1/2 w-44 h-44 object-contain z-10"
          />
        </div>
        <div className="text-center mt-6 px-6">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-primary text-lg font-medium">{points} Points</p>
        </div>
        <button
          onClick={() => onAddToCart(title, wasteId)} // Memanggil onAddToCart
          className="flex items-center justify-center bg-primary font-semibold text-white rounded-full mt-2 mb-4 w-56 py-2 shadow-md transform transition-transform duration-200 hover:scale-105"
        >
          Masukkan ke keranjang
        </button>
      </div>
    </div>
  );
};

const CardProduct = ({ products, pickupId }) => { // Ambil pickupId dari props
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  // Fungsi untuk menambah item ke keranjang
  const handleAddToCart = async (title, waste_id) => {
    const quantity = 1;
    try {
      console.log('Adding to cart with waste_id:', waste_id);
      await addItemToCart(waste_id, quantity); // Hapus pickupId dari sini
      setSelectedProduct(title);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="flex items-center justify-center p-8 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((card, index) => (
          <Card
            key={index}
            title={card.waste_name}
            points={card.point}
            image={card.image}
            bgImage="/images/pattern.jpg"
            onAddToCart={handleAddToCart} // Menambahkan fungsi handleAddToCart
            wasteId={card.waste_id}
          />
        ))}
      </div>
      {showAlert && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
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
              {selectedProduct} telah dimasukkan ke keranjang
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProduct;