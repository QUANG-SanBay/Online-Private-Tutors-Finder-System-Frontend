import axiosInstance from "../client/axios";


//login
export const login = async (credentials) => {
  try {
    const payload = {
      email: credentials.email.trim(),
      password: credentials.password,
    };

    const response = await axiosInstance.post(
      "/auth/login",
      payload,
      { timeout: 15000 }
    );

    const result = response.data?.result;

    if (result?.accessToken && result?.scope) {
      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("scope", result.scope);
    }

    return result;

  } catch (error) {
    console.error("Đăng nhập thất bại:", error.message);

    if (error.response) {
      console.error("Trạng thái:", error.response.status);
      console.error("Dữ liệu phản hồi:", error.response.data);
    }

    throw error;
  }
};

//forget password 
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/auth/forgot-password",
      { email: email.trim() },
      { timeout: 15000 }
    );

    return response.data;
  } catch (err) {
    console.error("Forgot password error:", err.response?.data);
    throw err;
  }
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post(
      "/auth/otp/verifyOtp",
      {
        email: email.trim(),
        otp: otp.trim()
      },
      { timeout: 15000 }
    );

    return response.data;
  } catch (err) {
    console.error("Lỗi verify OTP:", err.response?.data);
    throw err.response?.data || err;
  }
};

// Resend OTP
export const resendOtp = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/auth/otp/resendOtp",
      { email: email.trim() },
      { timeout: 15000 }
    );

    return response.data;
  } catch (err) {
    console.error("Lỗi resend OTP:", err.response?.data);
    throw err.response?.data || err;
  }
};

// reset password
export const resetPassword = async ({ email, password, confirmPassword }) => {
  try {
    const res = await axiosInstance.post("/auth/reset-password", {
      email,
      password,
      confirmPassword,
    });

    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};


