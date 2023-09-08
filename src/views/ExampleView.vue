<script setup lang="ts">
import { ref, computed } from 'vue'

let id = 0

const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Learn HTML', done: true },
  { id: id++, text: 'Learn JavaScript', done: true },
  { id: id++, text: 'Learn Vue', done: false }
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false })
  newTodo.value = ''
}

function removeTodo(todo: { id: number; text: string; done: boolean }) {
  todos.value = todos.value.filter((t) => t !== todo)
}

const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((todo) => !todo.done) : todos.value
})
</script>

<template>
  <div class="example">
    <form @submit.prevent="addTodo" class="todo-form">
      <input v-model="newTodo" />
      <button class="vue-btn">Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo)" class="delete-btn">X</button>
      </li>
    </ul>
    <button @click="hideCompleted = !hideCompleted" class="bottom-btn vue-btn">
      {{ hideCompleted ? 'Show all' : 'Hide completed' }}
    </button>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}

form {
    display: flex;
    justify-content: space-between;
    padding: 1vw;
}

input {
    margin-right: .5vw;
    min-height: 3vw;
    border-radius: 10px;
    border-color: inherit;
    background-color: inherit;
}

ul {
    margin: 1vw;
}
.delete-btn {
    background-color: greenyellow;
    border: none;
    border-radius: .1rem;
    margin-left: 1vw;
}

.bottom-btn { 
    margin: 1vw;
}

.vue-btn {
    padding: .6vw;
    background-color: green;
    color: aliceblue;
    border: 0px;
    border-radius: .7rem;
}

@media (min-width: 1024px) {
  .example {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
