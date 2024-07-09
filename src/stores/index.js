import { createStore } from "vuex";

const store = createStore({
  state: {
    cartState: [],
  },
  mutations: {
    saveCartState(state, cartState) {
      state.cartState = cartState;
    },
  },
  actions: {
    saveCartState({ commit }, cartState) {
      commit("saveCartState", cartState);
    },
  },
  getters: {
    cartState: (state) => state.cartState,
  },
});

export default store;
