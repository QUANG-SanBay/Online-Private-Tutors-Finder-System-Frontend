// src/services/tutorService.js

import axiosInstance from "../client/axios";

// ========================
// 1. Lấy thông tin gia sư (Tutor Info)
// ========================
export const getTutorInfo = async () => {
  try {
    // Gọi endpoint /tutors/home/info (không cần tutorId)
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
    const response = await axiosInstance.get('/tutors/home/requests/count');
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
// 5. Lấy thông tin cá nhân gia sư (Tutor Profile Info)
// ========================
export const fetchPersonalInfo = async () => {
  try {
    const response = await axiosInstance.get('/tutors/profile/personal-info');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    throw error;
  }
};

// ========================
// 6. Cập nhật thông tin cá nhân gia sư (Update Tutor Profile Info)
// ========================
export const updatePersonalInfo = async (payload) => {
  try {
    const response = await axiosInstance.put('/tutors/profile/personal-info', payload);
    return response.data.result;
  } catch (error) {
    console.error('Error updating personal info:', error);
    throw error;
  }
};

// ========================
// 7. Lấy thông tin trình độ học vấn của gia sư (Tutor Education Info)
// ========================
export const fetchEducationInfo = async () => {
  try {
    const response = await axiosInstance.get('/tutors/profile/education');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching education info:', error);
    throw error;
  }
};
// ========================
// 8. Cập nhật thông tin trình độ học vấn của gia sư (Update Tutor Education Info)
// ========================
export const updateEducationInfo = async (payload) => {
  try {
    const response = await axiosInstance.put('/tutors/profile/education', payload);
    return response.data.result;
  } catch (error) {
    console.error('Error updating education info:', error);
    throw error;
  }
};
// ========================
// 9. Lấy thông tin môn dạy của gia sư (Tutor Subjects Info)
// ========================
export const fetchSubjectsInfo = async () => {
  try {
    const response = await axiosInstance.get('/tutors/profile/subjects');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching subjects info:', error);
    throw error;
  }
};
// ========================
// 10. Cập nhật thông tin môn dạy của gia sư (Update Tutor Subjects Info)
// ========================
export const updateSubjectsInfo = async (payload) => {
  try {
    const response = await axiosInstance.put('/tutors/profile/subjects', payload);
    return response.data.result;
  } catch (error) {
    console.error('Error updating subjects info:', error);
    throw error;
  }
};
// ========================
// 11. Lấy thông tin đánh giá của gia sư (Tutor ratings)
// ========================
export const fetchTutorRatings = async () => {
  try {
    const response = await axiosInstance.get('/tutors/profile/ratings');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching tutor ratings:', error);
    throw error;
  }
}
// ========================
// 12. cập nhật avatar gia sư (Update Tutor Avatar)
// ========================
export const updateTutorAvatar = async (avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('avatarFile', avatarFile);
    const response = await axiosInstance.put('/tutors/profile/avatar', formData);
    return response.data.result;
  } catch (error) {
    console.error('Error updating tutor avatar:', error);
    throw error;
  }
};