import { createStore } from 'vuex';

export default createStore({
  state: {
    isDarkTheme: false,
  },
  mutations: {
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
      document.body.classList.toggle('dark-theme', state.isDarkTheme);
    },
    setTheme(state, isDarkTheme) {
      state.isDarkTheme = isDarkTheme;
      document.body.classList.toggle('dark-theme', isDarkTheme);
    }
  },
  actions: {
    toggleTheme({ commit }) {
      commit('toggleTheme');
    },
    applyInitialTheme({ commit }) {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      commit('setTheme', prefersDarkScheme);
    }
  },
  getters: {
    isDarkTheme: (state) => state.isDarkTheme,
  },
});