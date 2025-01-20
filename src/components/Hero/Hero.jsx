import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';

const Hero = () => {
  const [totals, setTotals] = useState({
    total_waste: 0,
    total_points: 0
  });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const community_id = localStorage.getItem('community_id');
        const response = await axios.get(`/api/orders/total-waste-points/${community_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.status) {
          setTotals(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching totals:', error);
      }
    };

    fetchTotals();
  }, []);

  return (
    <div className="relative overflow-hidden sm:rounded-lg bg-gray-900 text-white max-w-screen-xl mx-auto mt-24 md:mt-28 mb-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/60" />
        <img
          src="/images/hero.png"
          alt="Hero"
          className="h-full w-full object-cover opacity-50"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-6 md:p-10 sm:my-16 mb-44">
        <div className="flex flex-col justify-between items-center md:items-start">
          <div className="mb-8 sm:text-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 mt-4">
              <span className="block">Cara Baru</span>
              <span className="block">Daur Ulang</span>
              <span className="whitespace-nowrap">Sampah Elektronikmu</span>
            </h1>

            <div className="flex sm:justify-center">
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 text-lg font-semibold rounded-full flex items-center">
                Daur Ulang Sekarang
                <IoIosArrowForward className="ml-2 h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute right-0 bottom-0 z-20 bg-white rounded-none sm:rounded-tl-3xl p-0 sm:p-6 shadow-lg text-gray-900 sm:-mb-0 w-full max-w-xl md:w-auto">
        <div className="flex sm:flex-col md:flex-row sm:justify-between justify-center items-center gap-5 sm:gap-8 py-10 sm:py-0">
          {/* Total Sampah */}
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary text-3xl sm:text-5xl font-semibold">
                {totals.total_waste}
              </span>
              <span className="text-lg font-semibold">Total Sampah</span>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-white rounded-full py-2 px-4 flex items-center justify-center">
              Pilih Sampah
              <IoIosArrowForward className="ml-2 h-4 w-4" />
            </button>
          </div>

          <span className="hidden md:block border h-16"></span>

          {/* Poin */}
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary text-3xl sm:text-5xl font-semibold">
                {totals.total_points}
              </span>
              <span className="text-lg font-semibold">Pts</span>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-white rounded-full py-2 px-4 flex items-center justify-center">
              Tukar Point
              <IoIosArrowForward className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
