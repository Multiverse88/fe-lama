import { useState } from "react";
import "../styles/style.css";
import InputEmail from "../components/Input/InputEmail";
import { IoIosArrowRoundBack } from "react-icons/io";
import { forgotPassword } from "../services/register";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage(""); 
    setLoading(true); 

    try {
      await forgotPassword(email);
      setSuccessMessage("Tautan reset kata sandi telah dikirim ke email Anda.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Email tidak ditemukan.");
      } else {
        alert("Terjadi kesalahan pada server.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container px-1 flex justify-center items-center mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-7 lg:mx-6 items-center w-full max-w-6xl">
        <div className="hidden lg:block xl:w-100 xl:my-5 lg:w-95 lg:my-5">
          <img
            src="/images/forgot.png"
            alt="Forgot Password"
            className="w-full h-auto"
          />
        </div>
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-full mx-auto p-6">
          <div className="flex justify-center mb-5 lg:mb-2 lg:-mt-56">
            <img
              src="/images/Logo.png"
              alt="Logo"
              className="w-64 md:w-72 lg:w-80"
            />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold mb-2 text-gray-800">
            Lupa Kata Sandi
          </h1>
          <h5 className="text-sm xl:text-base mb-6 text-black opacity-50 font-semibold">
            Masukkan email Anda untuk atur ulang kata sandi{" "}
          </h5>

          {successMessage && (
            <div className="text-green-600 text-md">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-600 text-md">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <InputEmail
              id="email"
              label={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Email"}
            />

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark font-semibold text-white py-2 px-4 rounded cursor-pointer mt-2"
              disabled={loading} 
            >
              {loading ? "Memproses..." : "Kirim"}{" "}
  
            </button>
          </form>
          <div className="text-sm xl:text-base my-3 flex items-center justify-center">
            <a href="/LoginPage" className="text-black flex items-center">
              <IoIosArrowRoundBack size={28} className="mr-2" /> Kembali ke
              Halaman Masuk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;