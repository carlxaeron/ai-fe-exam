import apiService from '@/services/apiService';
import { createStore } from 'vuex';

export default createStore({
  state: {
    isDarkTheme: false,
    notification: {
      message: '',
      type: 'success',
      show: false,
    },
    modal: {
      show: false,
      title: '',
    },
    currentUser: null,
    // data
    articles: [],
    articlesForEdit: [],
    articlesPublished: [],
    companies: [],
    users: [],
  },
  mutations: {
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
      document.body.classList.toggle('dark-theme', state.isDarkTheme);
    },
    setTheme(state, isDarkTheme) {
      state.isDarkTheme = isDarkTheme;
      document.body.classList.toggle('dark-theme', isDarkTheme);
    },
    setNotification(state, notification) {
      state.notification = notification;
      if (notification.show) {
        setTimeout(() => {
          state.notification = { message: '', type: 'success', show: false };
        }, 5000);
      }
    },
    setModal(state, modal) {
      state.modal = modal;
    },
    // user
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
    // articles
    setArticles(state, articles) {
      state.articles = articles;
    },
    setArticlesForEdit(state, articles) {
      state.articlesForEdit = articles;
    },
    setArticlesPublished(state, articles) {
      state.articlesPublished = articles;
    },
    // companies
    setCompanies(state, companies) {
      state.companies = companies;
    }
  },
  actions: {
    toggleTheme({ commit }) {
      commit('toggleTheme');
    },
    applyInitialTheme({ commit }) {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      commit('setTheme', prefersDarkScheme);
    },
    setNotification({ commit }, notification) {
      commit('setNotification', notification);
    },
    clearNotification({ commit }) {
      commit('setNotification', { message: '', type: 'success', show: false });
    },
    setCurrentUser({ commit }, currentUser) {
      commit('setCurrentUser', currentUser);
    },
    setModal({ commit }, modal) {
      commit('setModal', modal);
    },
    toggleModal({ commit, state }, modal) {
      commit('setModal', { ...state.modal, show: !state.modal.show, ...modal });
    },
    // articles
    setArticles({ commit }, articles) {
      commit('setArticles', articles);
    },
    setArticlesForEdit({ commit }, articles) {
      commit('setArticlesForEdit', articles);
    },
    setArticlesPublished({ commit }, articles) {
      commit('setArticlesPublished', articles);
    },
    fetchArticles({ commit }) {
      apiService.getArticles()
        .then((response) => {
          commit('setArticles', response.data);
        })
        .catch((error) => {
          apiService.handleError(error);
        });
    },
    fetchArticlesForEdit({ commit }) {
      apiService.getArticles({ page: 0, limit: 2, forEdit: true })
        .then((response) => {
          commit('setArticlesForEdit', response.data);
        })
        .catch((error) => {
          apiService.handleError(error);
        });
    },
    fetchArticlesPublished({ commit }) {
      apiService.getArticles({ page: 0, limit: 2, published: true })
        .then((response) => {
          commit('setArticlesPublished', response.data);
        })
        .catch((error) => {
          apiService.handleError(error);
        });
    },
    fetchGlobalArticles({ dispatch }) {
      dispatch('fetchArticles');
      dispatch('fetchArticlesForEdit');
      dispatch('fetchArticlesPublished');
    },
    // companies
    setCompanies({ commit }, companies) {
      commit('setCompanies', companies);
    },
    fetchCompanies({ commit }) {
      apiService.getCompanies()
        .then((response) => {
          commit('setCompanies', response.data);
        })
        .catch((error) => {
          apiService.handleError(error);
        });
    },
  },
  getters: {
    isDarkTheme: (state) => state.isDarkTheme,
    notification: (state) => state.notification,
    getCurrentUser: (state) => state.currentUser,
    getModal: (state) => state.modal,
    getCompanies: (state) => state.companies,
  },
});