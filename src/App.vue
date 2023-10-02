<script setup lang="ts">
import CalculatorView from "./views/calculator/CalculatorView.vue"
</script>

<template>
  <header>
    <h1>Payment Calculator</h1>
  </header>
  <CalculatorView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  margin: 0 0 50px 0;
}
</style>