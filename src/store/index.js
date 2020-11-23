import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null,
    user: {
      id: null,
      email: null
    },
    cart: {
      items: []
    }
  },
  mutations: {
    updateUser(state, payload) {
      state.user = {
        id: payload.id,
        email: payload.email
      }
    },

    setAuth(state, payload) {
      state.auth = payload.auth
    },

    updateCart(state, payload) {
      console.log(payload.items);
      state.cart.items = payload.items;
    }
  },
  actions: {
    async signIn({ commit }, payload) {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client'
        },
        body: JSON.stringify({ user: { email: payload.email, password: payload.password } })
      });

      if (await response.status === 201) {
        const auth = response.headers.get('Authorization');
        const result = await response.json();

        commit('updateUser', { id: result.id, email: result.email });
        commit('setAuth', { auth: auth });
      }
    },

    async signOut({ commit, state }) {
      const response = await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': state.auth,
          'Jwt-Auth': 'user_web_client'
        }
      });

      if (await response.status === 204) {
        commit('updateUser', { id: null, email: null });
        commit('setAuth', { auth: null });
      }
    },

    async test({ state }) {
      const response = await fetch('http://localhost:3000/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': state.auth
        }
      });

      console.log(await response);
    },

    async storeCookie({ state }) {
      fetch('http://localhost:3000/store_cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': state.auth
        },
        credentials: 'include'
      });
    },

    async validateCookie({ commit }) {
      const response = await fetch('http://localhost:3000/validate_cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client'
        },
        credentials: 'include'
      });

      if (await response.status === 201) {
        const auth = response.headers.get('Authorization');
        const result = await response.json();

        commit('updateUser', { id: result.id, email: result.email });
        commit('setAuth', { auth: auth });
      }
    },

    async removeCookie() {
      fetch('http://localhost:3000/remove_cookie', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
        },
        credentials: 'include'
      });
    },

    async addItemToCart({ commit, state }, payload) {
      const response = await fetch('http://localhost:3000/carted_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': state.auth
        },
        body: JSON.stringify({ menu_item_id: payload.item.id })
      });

      if (await response.status === 201) {
        const result = await response.json();
        commit('updateCart', { items: result });
      }
    },

    async getItemsInCart({ commit, state }) {
      const response = await fetch('http://localhost:3000/carted_items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': state.auth
        }
      });

      if (await response.status === 200) {
        const result = await response.json();
        console.log(result);
        commit('updateCart', { items: result });
      }
    },

    async removeItemFromCart({ commit, state }, payload) {
      const response = await fetch(`http://localhost:3000/carted_items/${payload.item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': state.auth
        }
      });

      if (await response.status === 200) {
        const result = await response.json();
        commit('updateCart', { items: result });
      }
    },

    async checkout({ state }) {
      const response = await fetch(`http://localhost:3000/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': state.auth
        }
      });

      if (await response.status === 201) {
        const result = await response.json();
        console.log(result);
        // commit('updateCart', { items: result });
      }
    },
  },
  modules: {
  }
})
