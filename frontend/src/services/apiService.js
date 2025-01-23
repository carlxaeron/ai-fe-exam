import axiosInstance from './axiosInstance';
import helper from '@/utils/helper';
import store from '@/store';

const apiService = {
  login(username, password) {
    return axiosInstance.post(helper.getBaseUrl('login'), { username, password });
  },
  checkError(error) {
    console.log(error);
    if (error.response) {
      console.log(123);
      store.commit('setNotification', { type: 'error', message: error.response.data.errors[0].msg, show: true });
    }
    console.log(store.getters.notification);
  },
};

export default apiService;