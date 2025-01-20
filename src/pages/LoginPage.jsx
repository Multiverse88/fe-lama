import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import InputEmail from "../components/Input/InputEmail";
import InputPassword from "../components/Input/InputPassword";
import { Login } from "../services/register";
import Cookies from "js-cookie";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (email.trim() === "") {
      setEmailError("Email wajib diisi.");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Kata sandi wajib diisi.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const result = await Login(email, password, rememberMe);

      localStorage.setItem("token", result.token);
      Cookies.set(
        "profile",
        JSON.stringify({
          name: result.name,
          email: email,
        })
      );

      console.log("Login successful", result.message);

      navigate("/");
    } catch (error) {
      console.error(error);

      const message = error?.data?.message;

      if (message === "Pengguna tidak ditemukan") {
        setAlertMessage("Pengguna tidak ditemukan. Silakan cek email Anda.");
      } else if (
        message ===
        "Akun belum diverifikasi. Silakan periksa email Anda untuk OTP."
      ) {
        setAlertMessage(
          "Akun Anda belum diverifikasi. Silakan periksa email Anda untuk OTP."
        );
      } else if (message === "Password tidak valid") {
        setAlertMessage("Kata sandi tidak valid. Silakan coba lagi.");
      } else {
        setAlertMessage(message || "Terjadi kesalahan. Silakan coba lagi.");
      }

      setShowAlert(true);
    }
  };

  return (
    <div className="container px-1 flex justify-center items-center mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-7 lg:mx-6 items-center w-full max-w-6xl">
        <div className="hidden lg:block xl:w-100 xl:my-5 lg:w-95 lg:my-5">
          <img
            src="/images/register.png"
            alt="Login"
            className="w-full h-auto"
          />
        </div>
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-full mx-auto p-6">
          <div className="flex justify-center mb-5 lg:mb-2 lg:-mt-44">
            <img
              src="/images/Logo.png"
              alt="Logo"
              className="w-64 md:w-72 lg:w-80"
            />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold mb-2 text-gray-800">
            Masuk
          </h1>
          <h5 className="text-sm xl:text-base mb-2 text-black opacity-50 font-semibold">
            Masuk untuk mengakses akun Anda
          </h5>

          <form onSubmit={handleSubmit} className="space-y-3 w-full">
            <div>
              <InputEmail
                id="email"
                label={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Email"}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div className="mt-4">
              <InputPassword
                id="password"
                label={"Kata Sandi"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"Kata Sandi"}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div className="my-3 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-checkbox text-blue-600"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm xl:text-base ml-3 text-gray-700 text-md"
                >
                  Ingatkan saya
                </label>
              </div>
              <a
                href="ForgotPasswordPage"
                className="text-sm xl:text-base text-red-500 text-md"
              >
                Lupa kata sandi
              </a>
            </div>
            <button
              type="submit"
              className="text-sm xl:text-base w-full bg-primary hover:bg-primary-dark font-semibold text-white py-2 px-4 rounded"
            >
              Masuk
            </button>
          </form>
          <div className="text-sm xl:text-base text-center mt-2">
            <p>
              Anda belum memiliki akun?{" "}
              <a href="RegisterPage" className="text-red-500">
                Registrasi
              </a>
            </p>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-4 w-[80%] max-w-sm">
            <div className="mb-3 flex justify-center">
              <svg
                width="70"
                height="70"
                viewBox="0 0 136 136"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M131.213 67.9988C133.313 65.5529 134.785 62.6315 135.501 59.488C136.216 56.3445 136.154 53.0738 135.32 49.9598C134.485 46.8457 132.904 43.9822 130.712 41.6178C128.52 39.2534 125.785 37.4594 122.743 36.3915C123.339 33.223 123.153 29.957 122.201 26.8767C121.249 23.7963 119.56 20.9949 117.28 18.7152C115 16.4356 112.198 14.7467 109.118 13.7951C106.037 12.8434 102.771 12.6577 99.6026 13.2542C98.5355 10.2115 96.7419 7.47532 94.3775 5.28312C92.013 3.09092 89.1492 1.50899 86.0347 0.674678C82.9202 -0.159637 79.6491 -0.221118 76.5054 0.495572C73.3617 1.21226 70.4405 2.68546 67.9954 4.78726C65.5495 2.68691 62.6281 1.21504 59.4846 0.499336C56.3411 -0.216364 53.0704 -0.154277 49.9563 0.680209C46.8422 1.51469 43.9788 3.09637 41.6144 5.28804C39.2499 7.47971 37.456 10.2152 36.3881 13.2571C33.2198 12.6616 29.9541 12.8481 26.8742 13.8004C23.7942 14.7527 20.9932 16.4421 18.7139 18.7219C16.4347 21.0017 14.7461 23.8032 13.7945 26.8834C12.843 29.9635 12.6574 33.2293 13.2537 36.3974C10.2117 37.4653 7.47625 39.2593 5.28458 41.6237C3.09291 43.9881 1.51122 46.8516 0.676738 49.9656C-0.157748 53.0797 -0.219844 56.3504 0.495856 59.4939C1.21156 62.6374 2.68346 65.5588 4.78381 68.0047C2.68281 70.4505 1.21046 73.3721 0.494561 76.5159C-0.221343 79.6598 -0.159193 82.9308 0.675658 86.0452C1.51051 89.1595 3.09281 92.0231 5.28523 94.3873C7.47765 96.7515 10.214 98.5449 13.2566 99.6119C12.6598 102.78 12.8453 106.046 13.7969 109.126C14.7485 112.207 16.4376 115.008 18.7174 117.288C20.9972 119.567 23.7989 121.256 26.8794 122.207C29.9598 123.159 33.2258 123.344 36.394 122.746C37.4619 125.788 39.2558 128.524 41.6203 130.715C43.9847 132.907 46.8481 134.489 49.9622 135.323C53.0763 136.158 56.3469 136.22 59.4904 135.504C62.6339 134.788 65.5554 133.317 68.0013 131.216C70.4471 133.317 73.3687 134.79 76.5125 135.505C79.6563 136.221 82.9274 136.159 86.0417 135.324C89.1561 134.489 92.0197 132.907 94.3839 130.715C96.7481 128.522 98.5415 125.786 99.6085 122.743C102.777 123.34 106.043 123.154 109.123 122.203C112.204 121.251 115.005 119.562 117.285 117.282C119.565 115.003 121.254 112.201 122.205 109.121C123.157 106.04 123.342 102.774 122.746 99.606C125.788 98.5384 128.524 96.7445 130.716 94.38C132.907 92.0155 134.489 89.1518 135.323 86.0375C136.157 82.9233 136.219 79.6524 135.503 76.5089C134.786 73.3654 133.314 70.4442 131.213 67.9988Z"
                  fill="#E72929"
                />
                <path
                  d="M40 40L95.9992 95.9992"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M40 95.9992L95.9992 40"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center text-red-500">
              Masuk Gagal!
            </h2>
            <p className="text-gray-700 text-sm text-center mb-4">
              {alertMessage}
            </p>
            <div className="text-center">
              <button
                onClick={() => setShowAlert(false)}
                className="bg-primary text-white py-2 px-4 hover:bg-primary-dark rounded-xl"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;