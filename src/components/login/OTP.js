import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { Logo } from "../layouts/header/headerComp";

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [timeLeft, setTimeLeft] = useState(60);

  // Đếm ngược
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, ""); // chỉ số
    if (!val) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    if (otp.some((o) => o === "")) return alert("Nhập đầy đủ 4 số OTP!");
    navigate("/NewPassword");
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimeLeft(60);
    inputsRef.current[0].focus();
    alert("OTP mới đã gửi (giả lập)");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Logo />
        <h1>Nhập mã OTP</h1>
        <div className="otp-box">
          {otp.map((val, idx) => (
            <input
              key={idx}
              type="text"
              maxLength="1"
              value={val}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
            />
          ))}
        </div>

        <div className="timer">
          {timeLeft > 0 ? (
            <span>Thời gian còn lại: {timeLeft}s</span>
          ) : (
            <button className="btn-resend" onClick={handleResend}>
              Gửi lại OTP
            </button>
          )}
        </div>

        <button className="btn-login" onClick={handleVerifyOTP}>
          Xác thực OTP
        </button>
      </div>
    </div>
  );
};

export default OTP;
