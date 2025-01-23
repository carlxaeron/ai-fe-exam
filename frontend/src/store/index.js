import { createStore } from 'vuex';

export default createStore({
  state: {
    isDarkTheme: false,
    notification: {
      message: '',
      type: 'success',
      show: false,
    },
    currentUser: null,
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
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
  },
  actions: {
    toggleTheme({ commit }) {
      console.log('toggle theme');
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
  },
  getters: {
    isDarkTheme: (state) => state.isDarkTheme,
    notification: (state) => state.notification,
    getCurrentUser: (state) => state.currentUser,
  },
});