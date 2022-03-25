export default {
    isLoggedIn: state => {
      return state.auth !== null;
    },

    isLoggedOut: state => {
      return state.auth === null;
    },

    currentUser: state => {
      return state.user;
    }
}
