import axiosInstance from "../client/axios";

export const registerTutor = async (data) => {
  try {
    const formData = new FormData();

    // ✅ CHÍNH XÁC: Gửi JSON data dưới key "data"
    const requestData = {
      fullName: data.fullName. trim(),
      email: data. email.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      address: data.address. trim(),
      university: data. university.trim(),
      introduction: data.introduction.trim(),
      pricePerHour: data. pricePerHour,
      educationalLevel: data.educationalLevel,
      subjectIds: data.subjectIds,
    };
    
    // ✅ QUAN TRỌNG: Append JSON string với key "data"
    formData. append('data', JSON.stringify(requestData));

    // ✅ Avatar
    if (data.avatarFile) {
      formData.append('avatarFile', data.avatarFile);
    }

    // ✅ Certificates
    if (Array.isArray(data.certificateFiles) && data.certificateFiles.length > 0) {
      // Append tất cả file names
      data.certificateNames.forEach((name) => {
        if (name. trim()) {
          formData. append('certificateNames', name. trim());
        }
      });

      // Append tất cả files
      data. certificateFiles.forEach((file) => {
        if (file) {
          formData.append('certificateFiles', file);
        }
      });
    }

    // ✅ IMPORTANT: KHÔNG set Content-Type header
    // Browser sẽ tự động set với boundary
    const response = await axiosInstance.post(
      '/auth/tutors/register',
      formData,
      {
        timeout: 30000,
      }
    );
    return response.data;

  } catch (error) {
    console.error('Register tutor failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
    throw error;
  }
};


