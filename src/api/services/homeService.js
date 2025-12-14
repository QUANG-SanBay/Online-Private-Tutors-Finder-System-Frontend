import axiosInstance from '../client/axios';

export const getNotifications = async () => {
	const res = await axiosInstance.get('/public/home/notifications');
	return res.data?.result || [];
};

export const getFeaturedTutors = async () => {
	const res = await axiosInstance.get('/public/home');
	return res.data?.result || [];
};

export const getFeaturedEbooks = async () => {
	const res = await axiosInstance.get('/public/home/featured-ebooks');
    console.log('getFeaturedEbooks response:', res.data?.result);
	return res.data?.result || [];
};
