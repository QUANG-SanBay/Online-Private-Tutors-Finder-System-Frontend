import axiosInstance from "../client/axios";

/**
 * Logout user
 */
export const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("Không có token → logout local");
      return true;
    }

    const response = await axiosInstance.post(
      "/auth/logout",
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("Logout API error:", error.response?.data || error.message);
    // Nhưng vẫn phải cho logout ở FE
    return true;
  }
};
