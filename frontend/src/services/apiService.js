import axiosInstance from './axiosInstance';
import helper from '@/utils/helper';
import store from '@/store';

const apiService = {
  // auth
  login(username, password) {
    return axiosInstance().post(helper.getBaseUrl('login'), { username, password });
  },
  // articles
  createArticle(article) {
    return axiosInstance({formData: false}).post(helper.getBaseUrl('articles'), article);
  },
  // companies
  getCompanies() {
    return axiosInstance().get(helper.getBaseUrl('companies'));
  },
  // helper functions
  handleError(error) {
    const response = error.response;
    if (!response) {
      store.commit('setNotification', { type: 'error', message: 'Network error. Please try again later.', show: true });
      return;
    }
    if (response.status === 400) {
      store.commit('setNotification', { type: 'error', message: error.response.data.error ? error.response.data.error : error.response.data.errors[0].msg, show: true });
    } else if (response.status === 401) {
      store.commit('setNotification', { type: 'error', message: 'Invalid credentials', show: true });
    }
  },
};

export default apiService;