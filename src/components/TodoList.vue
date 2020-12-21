<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to bo done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div class="todo-item" v-for="todo in todosFiltered" :key="todo.id">
      <div class="todo-item-left">
        <input
          type="checkbox"
          v-model="todo.completed"
          @change="doneEdit(todo)"
        />
        <div
          v-if="!todo.editing"
          class="todo-item-label"
          :class="{ completed: todo.completed }"
          @dblclick="editTodo(todo)"
        >
          {{ todo.title }}
        </div>
        <input
          v-else
          class="todo-item-edit"
          type="text"
          v-model="todo.title"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)"
          v-focus
        />
      </div>
      <div class="remove-item" @click="removeTodo(todo)">
        &times;
      </div>
    </div>

    <div class="extra-container">
      <div>
        <label
          ><input type="checkbox" @change="checkAllTodos" />Check All</label
        >
      </div>
      <div>{{ remaining }} items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button @click="filter = 'all'" :class="{ active: filter == 'all' }">
          All
        </button>
        <button
          @click="filter = 'active'"
          :class="{ active: filter == 'active' }"
        >
          Active
        </button>
        <button
          @click="filter = 'completed'"
          :class="{ active: filter == 'completed' }"
        >
          Completed
        </button>
      </div>
      <div>
        <button v-if="showClearCompletedButton" @click="clearCompleted">
          Clear Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    // const todos = computed(() => store.state.todos.all);
    const remaining = computed(
      () => store.getters["todos/remaining"]
      //   () => store.state.todos.all.filter((el) => el.completed === false).length
    );
    const showClearCompletedButton = computed(
      () => store.getters["todos/showClearCompletedButton"]
      //   () => store.state.todos.all.filter((el) => el.completed === true).length > 0
    );
    const beforeTitle = ref("");
    const nextId = ref(3);
    const newTodo = ref("");
    const filter = ref("all");
    const todosFiltered = computed(() => {
      if (filter.value === "active") {
        return store.state.todos.all.filter((el) => el.completed === false);
      } else if (filter.value === "completed") {
        return store.state.todos.all.filter((el) => el.completed === true);
      } else {
        return store.state.todos.all;
      }
    });

    function addTodo(e) {
      store.commit("todos/addTodo", {
        id: nextId.value,
        title: e.target.value,
        completed: false,
        editing: false,
      });
      nextId.value++;
      newTodo.value = "";
    }

    function editTodo(todo) {
      beforeTitle.value = todo.title;
      store.commit("todos/editTodo", todo);
    }

    function doneEdit(todo) {
      store.commit("todos/doneEdit", todo);
    }

    function cancelEdit(todo) {
      todo.title = beforeTitle.value;
      store.commit("todos/cancelEdit", todo);
      beforeTitle.value = "";
    }

    function removeTodo(todo) {
      store.commit("todos/removeTodo", todo);
    }

    function checkAllTodos(e) {
      store.commit("todos/checkAllTodos", e.target.checked);
    }

    function clearCompleted() {
      store.commit("todos/clearCompleted");
    }

    store.dispatch("todos/getAllTodos");

    return {
      store,
      //   todos,
      newTodo,
      addTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeTodo,
      checkAllTodos,
      remaining,
      filter,
      todosFiltered,
      showClearCompletedButton,
      clearCompleted,
    };
  },
  directives: {
    focus: {
      // directive definition
      mounted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 10px;
  font-size: 18px;
  margin-bottom: 16px;
  &:focus {
    outline: 0;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Aveniz", Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  border: 1px solid lightgray;
  appearance: none;
  margin-right: 5px;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}
.active {
  background: lightgreen;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
