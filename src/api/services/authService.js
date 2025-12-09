import axiosInstance from "../client/axios";

export const registerTutor = async (data) => {
  try {
    console.log('📤 Sending register tutor request');
    console.log('═══════════════════════════════════════');

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

    console.log('📋 JSON Data:', requestData);
    console.log('─────────────────────────────────────');
    
    // ✅ QUAN TRỌNG: Append JSON string với key "data"
    formData. append('data', JSON.stringify(requestData));

    // ✅ Avatar
    if (data.avatarFile) {
      console.log('📷 Avatar File:', {
        name: data.avatarFile.name,
        size: data.avatarFile.size,
        type: data.avatarFile.type,
      });
      formData.append('avatarFile', data.avatarFile);
    } else {
      console.warn('⚠️ Avatar is null - NOT required');
    }

    // ✅ Certificates
    if (Array.isArray(data.certificateFiles) && data.certificateFiles.length > 0) {
      console.log(`📄 Certificates (${data.certificateFiles.length}):`);
      
      // Append tất cả file names
      data.certificateNames.forEach((name) => {
        if (name. trim()) {
          formData. append('certificateNames', name. trim());
          console.log(`  - ${name}`);
        }
      });

      // Append tất cả files
      data. certificateFiles.forEach((file) => {
        if (file) {
          formData.append('certificateFiles', file);
          console.log(`  - File: ${file.name}`);
        }
      });
    } else {
      console. log('📄 No certificates');
    }

    console.log('═══════════════════════════════════════');
    console.log('📦 Sending FormData.. .');

    // ✅ IMPORTANT: KHÔNG set Content-Type header
    // Browser sẽ tự động set với boundary
    const response = await axiosInstance.post(
      '/auth/tutors/register',
      formData,
      {
        timeout: 30000,
      }
    );

    console. log('✅ Response Status:', response.status);
    console.log('✅ Success:', response.data);
    console.log('═══════════════════════════════════════');
    return response.data;

  } catch (error) {
    console. error('═══════════════════════════════════════');
    console.error('❌ Error:', error. message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response Data:', error.response.data);
      
      if (error.response.data?. message) {
        console.error('Message:', error.response.data.message);
      }
      if (error.response.data?.error) {
        console.error('Error:', error.response.data.error);
      }
    }
    console.error('═══════════════════════════════════════');
    
    throw error;
  }
};