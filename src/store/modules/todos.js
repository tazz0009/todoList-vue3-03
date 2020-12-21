const state = () => ({
  all: [],
});

// getters
const getters = {
  remaining(state) {
    return state.all.filter((el) => el.completed === false).length;
  },
  showClearCompletedButton(state) {
    return state.all.filter((el) => el.completed === true).length > 0;
  },
};

// actions
const actions = {
  getAllTodos({ commit }) {
    const todos = [
      {
        id: 1,
        title: "Finish Vue Screencast",
        completed: false,
        editing: false,
      },
      { id: 2, title: "Take over world", completed: false, editing: false },
    ];
    commit("setTodos", todos);
  },
};

// mutations
const mutations = {
  addTodo(state, todo) {
    state.all.push(todo);
  },
  editTodo(state, todo) {
    const item = state.all.find((el) => el.id == todo.id);
    item.editing = true;
  },
  doneEdit(state, todo) {
    const item = state.all.find((el) => el.id == todo.id);
    item.editing = false;
    item.title = todo.title;
  },
  cancelEdit(state, todo) {
    const item = state.all.find((el) => el.id == todo.id);
    item.editing = false;
  },
  removeTodo(state, todo) {
    const index = state.all.indexOf((el) => el.id == todo.id);
    state.all.splice(index, 1);
  },
  checkAllTodos(state, completed) {
    state.all.forEach((el) => {
      el.completed = completed;
    });
  },
  clearCompleted(state) {
    state.all = state.all.filter((el) => el.completed == false);
  },
  setTodos(state, todos) {
    state.all = todos;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
