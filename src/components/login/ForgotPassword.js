import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

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
        <p className="return" onClick={() => navigate("/login")}>
          ← Quay về đăng nhập
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;