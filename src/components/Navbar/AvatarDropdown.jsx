import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/LoginPage");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary rounded-full">
          <img
            src="/images/hikel.jpg"
            alt="User Avatar"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        {isOpen ? (
          <FiChevronUp className="text-gray-600" />
        ) : (
          <FiChevronDown className="text-gray-600" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
          <Link
            to="/ProfilePage"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:font-semibold hover:text-white transition"
            onClick={closeDropdown}
          >
            Profil
          </Link>
          <Link
            to="/OrderPage"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:font-semibold hover:text-white transition"
            onClick={closeDropdown}
          >
            Order
          </Link>
          <button
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:font-semibold hover:text-white text-left"
            onClick={() => {
              closeDropdown();
              handleLogout();
            }}
          >
            Keluar
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
