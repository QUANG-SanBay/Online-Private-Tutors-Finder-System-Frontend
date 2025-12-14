import axiosInstance from '../client/axios';

export const getLearners = async (page = 0, size = 10) => {
	const response = await axiosInstance.get('/admin/learners', { params: { page, size } });
	return response.data?.result;
};

export const getLearnerDetail = async (learnerId) => {
	const response = await axiosInstance.get(`/admin/learners/${learnerId}`);
	return response.data?.result;
};

export const toggleLearnerStatus = async (learnerId) => {
	const response = await axiosInstance.patch(`/admin/learners/${learnerId}/status`);
	return response.data?.result;
};

export const getLearnerStats = async () => {
	const response = await axiosInstance.get('/admin/learners/stats');
	return response.data?.result;
};

// Tutor management
export const getTutors = async (page = 0, size = 5) => {
	const response = await axiosInstance.get('/admin/tutors', { params: { page, size } });
	return response.data?.result;
};

export const getTutorDetail = async (tutorId) => {
	const response = await axiosInstance.get(`/admin/tutors/${tutorId}`);
	return response.data?.result;
};

export const toggleTutorStatus = async (tutorId) => {
	const response = await axiosInstance.patch(`/admin/tutors/${tutorId}/status`);
	return response.data?.result;
};

export const getPendingTutors = async (page = 0, size = 5) => {
	const response = await axiosInstance.get('/admin/tutors/pending', { params: { page, size } });
	return response.data?.result;
};

export const getPendingTutorDetail = async (tutorId) => {
	const response = await axiosInstance.get(`/admin/tutors/${tutorId}/pending`);
	console.log('getPendingTutorDetail response:', response.data?.result);
	return response.data?.result;
};

export const approveTutor = async (tutorId) => {
	const response = await axiosInstance.put(`/admin/tutors/${tutorId}/approve`);
	return response.data;
};


