import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/style.css";
import InputPassword from "../components/Input/InputPassword";
import { resetPassword } from "../services/register";

function NewPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showExpiredAlert, setShowExpiredAlert] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const [timePassed, setTimePassed] = useState(0);

  // Validasi password
  const isValidLength = newPassword.length >= 8 && newPassword.length <= 20;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timePassed >= 180) {
      setShowExpiredAlert(true);
    }
  }, [timePassed]);

  useEffect(() => {
    if (!isFocused && newPassword) {
      if (!isValidLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
        setErrors((prev) => ({
          ...prev,
          newPassword:
            "Password tidak valid. Pastikan password memenuhi syarat.",
        }));
        setIsPasswordValid(false);
      } else {
        setErrors((prev) => ({
          ...prev,
          newPassword: "",
        }));
        setIsPasswordValid(true);
      }
    }
  }, [
    isFocused,
    newPassword,
    isValidLength,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmNewPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmNewPassword: "Kata sandi tidak cocok.",
      }));
      setLoading(false);
      return;
    }

    try {
      const result = await resetPassword(token, newPassword);
      console.log("Password reset successfully:", result.message);

      setShowAlert(true);
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response?.data || error.message
      );

      const errorMessage = error.response?.data?.error || error.message;
      if (errorMessage.toLowerCase().includes("jwt expired")) {
        setShowExpiredAlert(true);
      } else {
        alert(errorMessage || "Terjadi kesalahan. Silakan coba lagi.");
      }
    }

    setLoading(false);
  };

  const closeAlert = () => {
    setShowAlert(false);
    navigate("/LoginPage");
  };

  const closeExpiredAlert = () => {
    setShowExpiredAlert(false);
    navigate("/ForgotPasswordPage");
  };

  const validationMessage = (
    <div className="flex flex-col items-start text-sm mt-2">
      <p className="text-gray-700">
        Kata sandi Anda setidaknya harus memiliki:
      </p>
      <p className={isValidLength ? "text-green-500" : "text-red-500"}>
        ✓ 8 karakter (maksimal 20)
      </p>
      <p
        className={
          hasUppercase && hasNumber ? "text-green-500" : "text-red-500"
        }
      >
        ✓ 1 huruf kapital dan 1 angka
      </p>
      <p className={hasSpecialChar ? "text-green-500" : "text-red-500"}>
        ✓ 1 karakter khusus (contoh: . # ? ! $ & @)
      </p>
    </div>
  );

  const isSubmitDisabled =
    !isPasswordValid || !!errors.newPassword || !!errors.confirmNewPassword;

  return (
    <div className="container px-1 flex justify-center items-center mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-7 lg:mx-6 items-center w-full max-w-6xl">
        <div className="hidden lg:block xl:w-100 xl:my-5 lg:w-95 lg:my-5">
          <img
            src="/images/register.png"
            alt="New Password"
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
            Buat Kata Sandi Baru
          </h1>
          <h5 className="text-sm xl:text-base mb-2 text-black opacity-50 font-semibold">
            Permintaan atur ulang kata sandi diterima.
            <br />
            Silakan masukkan kata sandi baru Anda!
          </h5>
          <form onSubmit={handleSubmit}>
            <InputPassword
              id="newPassword"
              label="Kata Sandi Baru"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors((prev) => ({ ...prev, newPassword: "" }));
              }}
              placeholder="Kata Sandi Baru"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {errors.newPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.newPassword}
              </div>
            )}
            {isFocused && validationMessage}

            <InputPassword
              id="confirmNewPassword"
              label="Konfirmasi Kata Sandi Baru"
              value={confirmNewPassword}
              onChange={(e) => {
                const value = e.target.value;
                setConfirmNewPassword(value);
                if (value && value !== newPassword) {
                  setErrors((prev) => ({
                    ...prev,
                    confirmNewPassword: "Kata sandi tidak cocok.",
                  }));
                } else {
                  setErrors((prev) => ({
                    ...prev,
                    confirmNewPassword: "",
                  }));
                }
              }}
              placeholder="Konfirmasi Kata Sandi Baru"
            />
            {errors.confirmNewPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.confirmNewPassword}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark font-semibold text-white py-2 px-4 rounded cursor-pointer"
              disabled={loading || isSubmitDisabled}
            >
              {loading ? "Memproses..." : "Ubah Kata Sandi"}
            </button>
          </form>
          {(showAlert || showExpiredAlert) && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-lg p-4 w-[80%] max-w-sm">
                <div className="mb-3 flex justify-center">
                  {showAlert ? (
                    <svg
                      width="70"
                      height="70"
                      viewBox="0 0 131 131"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M126.391 65.4998C128.414 63.1438 129.832 60.3298 130.521 57.3018C131.21 54.2738 131.151 51.1234 130.347 48.1237C129.543 45.1241 128.019 42.3659 125.908 40.0884C123.797 37.8108 121.162 36.0828 118.232 35.0542C118.806 32.0021 118.627 28.856 117.71 25.8889C116.793 22.9218 115.166 20.2233 112.97 18.0274C110.773 15.8316 108.075 14.2048 105.107 13.2881C102.14 12.3714 98.9942 12.1926 95.9422 12.7671C94.9143 9.83625 93.1866 7.2006 90.9091 5.08896C88.6315 2.97733 85.873 1.45354 82.8729 0.649883C79.8729 -0.15377 76.722 -0.212992 73.6938 0.47736C70.6657 1.16771 67.8518 2.58677 65.4965 4.61133C63.1405 2.58816 60.3265 1.17038 57.2985 0.480986C54.2705 -0.208412 51.12 -0.148607 48.1204 0.655211C45.1208 1.45903 42.3625 2.98258 40.085 5.09371C37.8075 7.20483 36.0795 9.83976 35.0508 12.7699C31.999 12.1963 28.8532 12.376 25.8865 13.2933C22.9198 14.2106 20.2217 15.8378 18.0262 18.0339C15.8307 20.2299 14.2041 22.9285 13.2876 25.8954C12.3711 28.8624 12.1922 32.0081 12.7666 35.0598C9.83643 36.0885 7.2015 37.8165 5.09037 40.094C2.97925 42.3715 1.45569 45.1298 0.651868 48.1294C-0.151951 51.129 -0.211765 54.2795 0.477633 57.3075C1.16703 60.3355 2.58484 63.1495 4.608 65.5055C2.58422 67.8614 1.16598 70.6757 0.476386 73.704C-0.213208 76.7323 -0.153342 79.8831 0.650828 82.883C1.455 85.8829 2.97915 88.6412 5.091 90.9186C7.20284 93.1959 9.8386 94.9234 12.7694 95.9512C12.1946 99.003 12.3732 102.149 13.2898 105.116C14.2065 108.083 15.8335 110.782 18.0295 112.977C20.2256 115.173 22.9243 116.8 25.8915 117.716C28.8588 118.632 32.0048 118.811 35.0565 118.235C36.0852 121.166 37.8132 123.8 40.0907 125.912C42.3682 128.023 45.1264 129.546 48.1261 130.35C51.1257 131.154 54.2762 131.214 57.3041 130.524C60.3321 129.835 63.1462 128.417 65.5022 126.394C67.8581 128.418 70.6724 129.836 73.7007 130.526C76.729 131.215 79.8798 131.155 82.8797 130.351C85.8796 129.547 88.6379 128.023 90.9153 125.911C93.1926 123.799 94.9201 121.163 95.9479 118.233C98.9998 118.807 102.146 118.629 105.113 117.712C108.08 116.795 110.779 115.168 112.975 112.972C115.171 110.776 116.798 108.078 117.714 105.111C118.631 102.143 118.81 98.9974 118.235 95.9455C121.165 94.9171 123.8 93.1891 125.912 90.9115C128.023 88.6339 129.546 85.8755 130.35 82.8757C131.154 79.8758 131.213 76.7252 130.523 73.6972C129.833 70.6692 128.415 67.8554 126.391 65.4998Z"
                        fill="#42A444"
                      />
                      <path
                        d="M53.7399 90.5042L35.5378 72.3135C34.847 71.6216 34.459 70.6838 34.459 69.7061C34.459 68.7283 34.847 67.7906 35.5378 67.0987L37.7492 64.8844C38.4411 64.1936 39.3789 63.8056 40.3566 63.8056C41.3343 63.8056 42.2721 64.1936 42.964 64.8844L56.1954 78.1074L87.3565 44.9933C88.027 44.2818 88.9524 43.8655 89.9296 43.8357C90.9067 43.8059 91.8558 44.165 92.5684 44.8343L94.8395 46.9776C95.5518 47.6482 95.9686 48.5742 95.9984 49.5521C96.0282 50.5299 95.6685 51.4796 94.9984 52.1924L59.0427 90.4219C58.7042 90.7827 58.2965 91.0718 57.844 91.2719C57.3916 91.472 56.9035 91.5791 56.4088 91.5867C55.9141 91.5944 55.4228 91.5025 54.9644 91.3166C54.5059 91.1306 54.0895 90.8543 53.7399 90.5042Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
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
                  )}
                </div>
                <h2
                  className={`text-xl font-bold mb-2 text-center ${
                    showAlert ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {showAlert ? "Berhasil!!" : "Link Kedaluwarsa"}
                </h2>

                <p className="text-gray-700 text-sm text-center mb-4">
                  {showAlert
                    ? "Kata Sandi Anda telah berhasil diperbarui"
                    : "Link reset Kata Sandi Anda telah kedaluwarsa. Silakan kirim ulang permintaan untuk link baru."}
                </p>
                <div className="text-center">
                  <button
                    onClick={showAlert ? closeAlert : closeExpiredAlert}
                    className="bg-primary text-white py-2 px-4 hover:bg-primary-dark rounded-xl"
                  >
                    {showAlert ? "Oke" : "Oke"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewPasswordPage;