<script setup lang="ts">
  import { ref } from 'vue';
  const msg = ref('new message')
</script>

<template>
  <div>
    <h1>This is a blank page</h1>
    <p class="text">{{ msg.toUpperCase() }}</p>
    <form action="submit">
      <label for="payer-1">First Payer: </label>
      <input id="payer-1" type="number" />
      <label for="payer-2">Second Payer: </label>
      <input id="payer-2" type="number" />
      <label for="payer-3">Third Payer: </label>
      <input id="payer-3" type="number" />
      <label for="payer-4">Fourth Payer: </label>
      <input id="payer-4" type="number" />
      <button type="submit">Calculate</button>
    </form>
    
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