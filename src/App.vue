<script setup lang="ts">
  import { ref } from 'vue';
  const msg = ref('new message')
</script>

<template>
  <div>
    <h1>This is a blank page</h1>
    <p class="text">{{ msg.toUpperCase() }}</p>
  </div>
</template>

<style scoped>
  .text {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 900;
    font-size: 35px;
    font-style: oblique;
  }
</style>