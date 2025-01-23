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
  getArticles(config = {}) {
    if (config.id) {
      return axiosInstance().get(helper.getBaseUrl('articles') + '/' + config.id);
    }

    const getParams = (config) => {
      let params = '';
      if (config.page) {
        params += '?page=' + config.page;
      }
      if (config.limit) {
        params += params ? '&limit=' + config.limit : '?limit=' + config.limit;
      }
      if (config.forEdit) {
        params += params ? '&forEdit=true' : '?forEdit=true';
      }
      if (config.published) {
        params += params ? '&published=true' : '?published=true';
      }
      return params;
    };

    return axiosInstance().get(helper.getBaseUrl('articles') + getParams(config));
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