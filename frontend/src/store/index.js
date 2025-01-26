import apiService from '@/services/apiService';
import { createStore } from 'vuex';

export default createStore({
  state: {
    isDarkTheme: false,
    viewPort: false,
    closeMenu: false,
    notification: {
      message: '',
      type: 'success',
      show: false,
    },
    modal: {
      show: false,
      title: '',
    },
    confirmModal: {
      show: false,
      title: '',
      message: '',
      onConfirm: () => {},
    },
    currentUser: null,
    // data
    article: null,
    articles: [],
    articlesLoading: false,
    articlesForEdit: [],
    articlesForEditLoading: false,
    articlesPublished: [],
    articlesPublishedLoading: false,
    companies: [],
    users: [],
    usersLoading: false,
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
    setConfirmModal(state, confirmModal) {
      state.confirmModal = confirmModal;
    },
    setViewPort(state, viewPort) {
      state.viewPort = viewPort;
    },
    setCloseMenu(state, closeMenu) {
      state.closeMenu = closeMenu;
    },
    // user
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setUsersLoading(state, loading) {
      state.usersLoading = loading;
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
    setArticle(state, article) {
      state.article = article;
    },
    showAdminArticle(state, bool) {
      state.showAdminArticle = bool;
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
    setConfirmModal({ commit }, confirmModal) {
      if (!confirmModal.show) {
        confirmModal.title = '';
        confirmModal.onConfirm = () => {};
        confirmModal.message = '';
      }
      commit('setConfirmModal', confirmModal);
    },
    toggleConfirmModal({ commit, state }, confirmModal) {
      commit('setConfirmModal', { ...state.confirmModal, show: !state.confirmModal.show, ...confirmModal });
    },
    setViewPort({ commit }, viewPort) {
      let wPort = false;
      if (viewPort.width) {
        if (viewPort.width > 1200) {
          wPort = 'xl';
        } else if (viewPort.width > 992) {
          wPort = 'lg';
        } else if (viewPort.width > 768) {
          wPort = 'md';
        } else if (viewPort.width > 576) {
          wPort = 'sm';
        } else {
          wPort = 'xs';
        }
      }
      commit('setViewPort', wPort);
    },
    setCloseMenu({ commit, state }, closeMenu) {
      commit('setCloseMenu', closeMenu ? closeMenu : !state.closeMenu);
    },
    // user
    logout({ commit }) {
      commit('setCurrentUser', null);
    },
    // users
    setUsers({ commit }, users) {
      commit('setUsers', users);
    },
    setUsersLoading({ commit }, loading) {
      commit('setUsersLoading', loading);
    },
    fetchUsers({ commit }) {
      commit('setUsersLoading', true);
      apiService.getUsers()
        .then((response) => {
          commit('setUsersLoading', false);
          commit('setUsers', response.data);
        })
        .catch((error) => {
          commit('setUsersLoading', false);
          apiService.handleError(error);
        });
    },
    // articles
    setArticlesLoading({ commit }, loading) {
      commit('setArticlesLoading', loading);
    },
    setArticles({ commit }, articles) {
      commit('setArticles', articles);
    },
    setArticle({ commit }, article) {
      commit('setArticle', article);
      if (article) {
        commit('setModal', { show: true, title: 'Edit Article' });
        commit('showAdminArticle', true);
      }
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
    showAdminArticle({ commit }, bool) {
      commit('showAdminArticle', bool);
      commit('setModal', { show: bool });
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
    getModal: (state) => state.modal,
    getConfirmModal: (state) => state.confirmModal,
    getViewPort: (state) => state.viewPort,
    closeMenu: (state) => state.closeMenu,
    // user
    getCurrentUser: (state) => state.currentUser,
    // users
    getUsers: (state) => state.users,
    // companies
    getCompanies: (state) => state.companies,
    // articles
    getArticles: (state) => state.articles,
    getArticlesForEdit: (state) => state.articlesForEdit,
    getArticlesPublished: (state) => state.articlesPublished,
    getArticle: (state) => state.article,
    isShowAdminArticle: (state) => state.showAdminArticle,
    // loading
    articlesLoading: (state) => state.articlesLoading,
    articlesForEditLoading: (state) => state.articlesForEditLoading,
    articlesPublishedLoading: (state) => state.articlesPublishedLoading,
    usersLoading: (state) => state.usersLoading,
  },
});