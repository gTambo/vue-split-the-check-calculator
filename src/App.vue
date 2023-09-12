<script setup lang="ts">
  import { ref } from 'vue';
  const msg = ref('enter your percentages')
  const percentage1 = ref(25)
  const percentage2 = ref(25)
  const percentage3 = ref(25)
  const percentage4 = ref(25)
  const total = ref(0)
  const payment1 = ref()
  const payment2 = ref()
  const payment3 = ref()
  const payment4 = ref()

  function verifyPercentages(percentages: Array<number>): boolean {
    if(percentages.reduce((x, y) => x + y) == 100) return true
    return false
  }
  function calculate() {
    // check percentages
    if(verifyPercentages([percentage1.value, percentage2.value, percentage3.value, percentage4.value])){
      payment1.value = total.value * percentage1.value / 100
      payment2.value = total.value * percentage2.value / 100
      payment3.value = total.value * percentage3.value / 100
      payment4.value = total.value * percentage4.value / 100
    }
    else {alert("percentages must total to 100")}

  }
</script>

<template>
  <div>
    <h1>Payment Calculator</h1>
    
    <form action="submit" @submit.prevent="calculate()">
      <label for="total-amount" class="text">Enter the total: </label>
      $<input v-model="total" id="total-amount" type="number">
      <p class="text">{{ msg }}</p>
      <label for="percentage-1">First payer: $</label>
      <input v-model="percentage1" id="percentage-1" type="number" min="0" max="100" step="5" />
      <label for="percentage-2">Second payer: $</label>
      <input v-model="percentage2" id="percentage-2" type="number" min="0" max="100" step="5" />
      <label for="percentage-3">Third payer: $</label>
      <input v-model="percentage3" id="percentage-3" type="number" min="0" max="100" step="5" />
      <label for="percentage-4">Fourth payer: </label>
      <input v-model="percentage4" id="percentage-4" type="number" min="0" max="100" step="5" />
      <button type="submit">Calculate</button>
    </form>
    
    <p class="text">1: ${{ payment1 }}, <br/>
                 2: ${{ payment2 }}, <br/>
                 3: ${{ payment3 }}, <br/>
                 4: ${{ payment4 }}</p>
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