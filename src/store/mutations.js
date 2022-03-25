export default {
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
}
