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

function removeTodo(todo: { id: number, text: string, done: boolean }) {
  todos.value = todos.value.filter((t) => t !== todo)
}
  
  const filteredTodos = computed(() => {
    return hideCompleted.value 
      ? todos.value.filter(todo => !todo.done)
    	: todos.value
  })
</script>

<template class="example">
  <form @submit.prevent="addTodo" class="green">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<style>
.done {
  text-decoration: line-through;
}

@media (min-width: 1024px) {
    .example {
        min-height: 100vh;
        /* display: grid;
        align-items: center; */
    }
}
</style>