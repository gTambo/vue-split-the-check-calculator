<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  const msg = ref('enter your percentages')
  const payers = ref(0)
  const total = ref(0)
  const id = ref(0)
  const payerName = ref('')
  // function incrementId() {
  //   id.value++
  // }

  const percentageList = ref(new Array<{id: String, name: String, percent: number, payment: number}>)
  
  function clearList(list: Array<any>) {
    if(list.length) {
      let length = list.length
      for(let i = 0; i < length; i++) {
        list.pop();
      }
    }
  }
  async function createInputs() {

    percentageList.value.push({ id: id.value.toString(), name: payerName.value, percent: 0, payment: 0})
    id.value++
    // if(percentageList.value.length != payers.value) {
    //   clearList(percentageList.value)
    //   for(let i = 0; i < payers.value; i++) {
    //     // create percentage ref and add to percentage list
    //     const id = (i + 1).toString()
    //     let newName = 'percentage' + id
    //     let payer = { id: id, name: newName, percent: 0, payment: 0 }

    //     percentageList.value.push(payer)
        
    //   }
    // }
    // payers.value = 0
    // await nextTick()
    
  }

  function verifyPercentages(percentages: Array<number>): boolean {
    if(percentages.reduce((x, y) => x + y, 0) == 100) return true
    return false
  }

  function calculate() {
    if(verifyPercentages(percentageList.value.map(payer => payer.percent))){
      percentageList.value.map(payer => (payer.payment = total.value * payer.percent / 100))
    }
    else {alert("percentages must total to 100")}

  }
</script>

<template>
  <div>
    <h1>Payment Calculator</h1>

    <form action="submit" @submit.prevent="createInputs">
      <label for="payers">Name: </label>
      <input v-model="payerName" id="payers" type="text" >
      <button type="submit">Set as Payer</button>
    </form>
    
    <form action="submit" @submit.prevent="calculate()">
      <label for="total-amount" class="text">Enter the total: </label>
      $<input v-model="total" id="total-amount" type="number" min=".01" step=".01" max="1000000">
      <p class="text">{{ msg }}</p>
      
      <div v-if="percentageList.length">
        <div v-for="payer in percentageList" :key="'payer' + payer.id">
        <label :for="'percent' + payer.id">{{ payer.name }} $</label>
        <input v-model="payer.percent" :id="'percent' + payer.id" type="number" min="0.01" max="100" step=".01"/>
        </div>
      </div>
      <button type="submit">Calculate</button>
    </form>
    
    <p class="text" v-for="payer in percentageList" :key="'total' + payer.id">1: ${{ payer.payment.toFixed(2) }}, <br/></p>
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