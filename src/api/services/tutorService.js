// src/services/tutorService.js

import axiosInstance from "../client/axios";

// ========================
// 1. Lấy thông tin gia sư (Tutor Info)
// ========================
export const getTutorInfo = async () => {
  try {
    // ✅ ĐÚNG: Gọi endpoint /tutors/home/info (không cần tutorId)
    const response = await axiosInstance.get('/tutors/home/info');
    return response.data.result; // Trả về tutor info đầy đủ
  } catch (error) {
    console.error('Error fetching tutor info:', error);
    throw error;
  }
};

// ========================
// 2. Lấy tổng số buổi học trong tuần (Weekly Schedule)
// ========================
export const getWeeklyClassCount = async () => {
  try {
    const response = await axiosInstance.get('/tutors/home/schedule');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching weekly classes:', error);
    throw error;
  }
};

// ========================
// 3. Lấy số yêu cầu mới (New Requests Count)
// ========================
export const getNewRequestsCount = async () => {
  try {
    const response = await axiosInstance.get('/tutors/home/requests');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching new requests:', error);
    throw error;
  }
};

// ========================
// 4. Lấy danh sách lớp đang dạy (Active Classes List)
// ========================
export const getActiveClasses = async (page = 0, size = 5) => {
  try {
    const response = await axiosInstance.get('/tutors/home/classes', {
      params: { page, size },
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching active classes:', error);
    throw error;
  }
};

// ========================
// 5. Lấy ratings trung bình (Average Rating)
// ========================
// export const getTutorRating = async () => {
//   try {
//     const info = await getTutorInfo();
//     return {
//       averageRating: info.averageRating || 0,
//     };
//   } catch (error) {
//     console.error('Error fetching tutor rating:', error);
//     throw error;
//   }
// };