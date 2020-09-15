import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: null,
      auth: null
    }
  },
  mutations: {
    updateUser(state, payload) {
      state.user = {
        email: payload.email,
        auth: payload.auth
      }
    }
  },
  actions: {
    async signIn({ commit }) {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client'
        },
        body: JSON.stringify({ user: { email: 'mitchfischer6@gmail.com', password: 'password' } })
      });

      const auth = await response.headers.get('Authorization');
      const result = await response.json();

      commit('updateUser', { email: result.email, auth: auth });
    },

    async signOut({ commit, state }) {
      const response = await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': state.user.auth
        }
      });

      if (await response.status === 204) {
        commit('updateUser', { email: null, auth: null });
      }
    }
  },
  modules: {
  }
})
