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
    articlesLoading: false,
    articlesForEdit: [],
    articlesForEditLoading: false,
    articlesPublished: [],
    articlesPublishedLoading: false,
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
    setArticlesLoading(state, loading) {
      state.articlesLoading = loading;
    },
    setArticlesForEdit(state, articles) {
      state.articlesForEdit = articles;
    },
    setArticlesForEditLoading(state, loading) {
      state.articlesForEditLoading = loading;
    },
    setArticlesPublished(state, articles) {
      state.articlesPublished = articles;
    },
    setArticlesPublishedLoading(state, loading) {
      state.articlesPublishedLoading = loading;
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
    setArticlesLoading({ commit }, loading) {
      commit('setArticlesLoading', loading);
    },
    setArticles({ commit }, articles) {
      commit('setArticles', articles);
    },
    setArticlesForEditLoading({ commit }, loading) {
      commit('setArticlesForEditLoading', loading);
    },
    setArticlesForEdit({ commit }, articles) {
      commit('setArticlesForEdit', articles);
    },
    setArticlesPublishedLoading({ commit }, loading) {
      commit('setArticlesPublishedLoading', loading);
    },
    setArticlesPublished({ commit }, articles) {
      commit('setArticlesPublished', articles);
    },
    fetchArticles({ commit, dispatch }) {
      dispatch('setArticlesLoading', true);
      apiService.getArticles()
        .then((response) => {
          dispatch('setArticlesLoading', false);
          commit('setArticles', response.data);
        })
        .catch((error) => {
          dispatch('setArticlesLoading', false);
          apiService.handleError(error);
        });
    },
    fetchArticlesForEdit({ commit, dispatch }) {
      dispatch('setArticlesForEditLoading', true);
      apiService.getArticles({ page: 0, limit: 2, forEdit: true })
        .then((response) => {
          dispatch('setArticlesForEditLoading', false);
          commit('setArticlesForEdit', response.data);
        })
        .catch((error) => {
          dispatch('setArticlesForEditLoading', false);
          apiService.handleError(error);
        });
    },
    fetchArticlesPublished({ commit, dispatch }) {
      dispatch('setArticlesPublishedLoading', true);
      apiService.getArticles({ page: 0, limit: 2, published: true })
        .then((response) => {
          dispatch('setArticlesPublishedLoading', false);
          commit('setArticlesPublished', response.data);
        })
        .catch((error) => {
          dispatch('setArticlesPublishedLoading', false);
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
    // articles
    getArticles: (state) => state.articles,
    getArticlesForEdit: (state) => state.articlesForEdit,
    getArticlesPublished: (state) => state.articlesPublished,
    // loading
    articlesLoading: (state) => state.articlesLoading,
    articlesForEditLoading: (state) => state.articlesForEditLoading,
    articlesPublishedLoading: (state) => state.articlesPublishedLoading,
  },
});