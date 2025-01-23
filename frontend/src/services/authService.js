import axiosInstance from './axiosInstance';
import helper from '@/utils/helper';

const authService = {
  login(username, password) {
    return axiosInstance.post(helper.getBaseUrl('login'), { username, password });
  },
};

export default authService;