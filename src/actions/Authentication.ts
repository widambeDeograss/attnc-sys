import { createApp } from "vue"
import {createStore} from 'vuex'
import axios from "axios";
import {baseUrl} from '../actions/BaseUrl'

const initialstate = {
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user')
}

export default createStore({
  state: {
    user: initialstate.user, // Initial user state, set to null for no user
    token: initialstate.token, // Initial token state, set to null for no token
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state:any) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        
        // Make a POST request to your authentication endpoint
        const response = await axios.post(`${baseUrl}/facesystem/login`, credentials);
        const { user, token } = response.data;

        // Set user and token in state
        commit('SET_USER', user);
        commit('SET_TOKEN', token);

        // Store token in local storage for persistence (optional)
        localStorage.setItem('token', token);
      } catch (error) {
        throw error; // Handle error
      }
    },
    logout({ commit }) {
      // Clear user and token from state
      commit('LOGOUT');

      // Remove token from local storage (optional)
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});
