// import { createStore } from "vuex";

/* // Create a new store instance.
const store = createStore({
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {},
});

export default store; */

import { createStore } from "vuex";
import todos from "./modules/todos";

export default createStore({
  modules: {
    todos,
  },
});
