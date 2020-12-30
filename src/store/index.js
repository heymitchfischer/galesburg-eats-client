import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null,
    user: {
      id: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null
    },
    cart: {
      items: []
    }
  },

  getters: {
    isLoggedIn: state => {
      return state.auth !== null;
    },

    isLoggedOut: state => {
      return state.auth === null;
    },

    currentUser: state => {
      return state.user;
    }
  },

  mutations: {
    updateUser(state, payload) {
      state.user = {
        id: payload.id,
        firstName: payload.first_name,
        lastName: payload.last_name,
        phoneNumber: payload.phone_number,
        email: payload.email
      }
    },

    setAuth(state, payload) {
      state.auth = payload.auth
    },

    updateCart(state, payload) {
      state.cart.items = payload.items;
    }
  },

  actions: {
    async signIn({ commit }, payload) {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client'
        },
        body: JSON.stringify({ user: { email: payload.email, password: payload.password } })
      });

      const result = await response.json();

      if (response.ok) {
        const auth = response.headers.get('Authorization');
        commit('updateUser', result);
        commit('setAuth', { auth: auth });
        localStorage.setItem('auth', auth);
      } else {
        throw result.error;
      }
    },

    async signUp({ commit }, payload) {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client'
        },
        body: JSON.stringify({
          user: {
            first_name: payload.firstName,
            last_name: payload.lastName,
            phone_number: payload.phoneNumber,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.passwordConfirmation
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        const auth = response.headers.get('Authorization');
        commit('updateUser', result);
        commit('setAuth', { auth: auth });
        localStorage.setItem('auth', auth);
      } else {
        throw result.errors;
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
        commit('updateUser', {});
        commit('setAuth', { auth: null });
        localStorage.removeItem('auth');
      }
    },

    async autoSignIn({ commit }) {
      const auth = localStorage.getItem('auth');
      const response = await fetch('http://localhost:3000/users/auto_sign_in', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
          'Jwt-Auth': 'user_web_client'
        }
      });

      const result = await response.json();

      if (response.ok) {
        commit('updateUser', result);
        commit('setAuth', { auth: auth });
      } else {
        localStorage.removeItem('auth');
      }
    },

    // Leaving these functions in for now as we might want to store the jwt token in
    // a cookie in the future?

    // async storeCookie({ state }) {
    //   fetch('http://localhost:3000/store_cookie', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Jwt-Auth': 'user_web_client',
    //       'Authorization': state.auth
    //     },
    //     credentials: 'include'
    //   });
    // },

    // async validateCookie({ commit }) {
    //   const response = await fetch('http://localhost:3000/validate_cookie', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Jwt-Auth': 'user_web_client'
    //     },
    //     credentials: 'include'
    //   });

    //   if (await response.status === 201) {
    //     const auth = response.headers.get('Authorization');
    //     const result = await response.json();

    //     commit('updateUser', { id: result.id, email: result.email });
    //     commit('setAuth', { auth: auth });
    //   }
    // },

    // async removeCookie() {
    //   fetch('http://localhost:3000/remove_cookie', {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Jwt-Auth': 'user_web_client',
    //     },
    //     credentials: 'include'
    //   });
    // },

    async addItemToCart({ commit, state }, payload) {
      const response = await fetch('http://localhost:3000/carted_items', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': state.auth
        },
        body: JSON.stringify({ menu_item_id: payload.item.id })
      });

      const result = await response.json();

      if (response.ok) {
        commit('updateCart', { items: result });
      } else {
        throw result.error;
      }
    },

    async getItemsInCart({ commit, state }) {
      const response = await fetch('http://localhost:3000/carted_items', {
        method: 'GET',
        credentials: 'include',
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

    async removeItemFromCart({ commit, state }, payload) {
      const response = await fetch(`http://localhost:3000/carted_items/${payload.item.id}`, {
        method: 'DELETE',
        credentials: 'include',
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
        credentials: 'include',
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
