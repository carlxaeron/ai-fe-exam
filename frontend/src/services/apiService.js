import axiosInstance from './axiosInstance';
import helper from '@/utils/helper';
import store from '@/store';

const apiService = {
  login(username, password) {
    return axiosInstance.post(helper.getBaseUrl('login'), { username, password });
  },
  checkError(error) {
    const response = error.response;
    if (response.status === 400) {
      store.commit('setNotification', { type: 'error', message: error.response.data.errors[0].msg, show: true });
    } else if (response.status === 401) {
      store.commit('setNotification', { type: 'error', message: 'Invalid credentials', show: true });
    }
  },
};

export default apiService;