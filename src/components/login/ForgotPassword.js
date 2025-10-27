import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { Logo } from "../layouts/header/headerComp";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    if (!email) return alert("Vui lòng nhập email!");
    alert("Mã OTP đã gửi (giả lập)");
    navigate("/OTP");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Logo />
        <h1>Quên mật khẩu</h1>
        <h3>Nhập email đã đăng ký để nhận OTP</h3>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn-login" onClick={handleSendEmail}>
          Gửi OTP
        </button>
        <button className="btn-google" onClick={() => navigate("/login")}>
          Quay về đăng nhập
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;