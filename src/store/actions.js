import {
    getCookieAuth,
    clearCookieAuth,
    setCookieAuth
} from '@/misc/helpers.js'  

export default {
    async signIn({ commit }, payload) {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/users/sign_in`, {
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
        setCookieAuth(auth);
      } else {
        throw result.error;
      }
    },

    async signUp({ commit }, payload) {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/users`, {
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
        setCookieAuth(auth);
      } else {
        throw result.errors;
      }
    },

    async signOut({ commit, state }) {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/users/sign_out`, {
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
        clearCookieAuth();
      }
    },

    async autoSignIn({ commit }) {
      let auth = getCookieAuth();

      const response = await fetch(`${process.env.VUE_APP_API_URL}/users/auto_sign_in`, {
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
        clearCookieAuth();
      }
    },

    async updateProfile({ commit, state }, payload) {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/users`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': state.auth,
          'Jwt-Auth': 'user_web_client'
        },
        body: JSON.stringify({
          user: {
            first_name: payload.firstName,
            last_name: payload.lastName,
            phone_number: payload.phoneNumber,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.passwordConfirmation,
            current_password: payload.currentPassword
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        commit('updateUser', result);
      } else {
        throw result.errors;
      }
    },

    async addItemToCart({ commit, state }, payload) {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/carted_items`, {
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
      const response = await fetch(`${process.env.VUE_APP_API_URL}/carted_items`, {
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
      const response = await fetch(`${process.env.VUE_APP_API_URL}/carted_items/${payload.item.id}`, {
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
      const response = await fetch(`${process.env.VUE_APP_API_URL}/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'user_web_client',
          'Authorization': state.auth
        }
      });

      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        throw result.error;
      }
    }
}