<script setup lang="ts">
import { ref } from 'vue';

const total = ref(0)
const payerId = ref(0)
const payerName = ref('')
const itemNo = ref(1)
const itemName = ref('')
const itemCost = ref(0.00)
const payersList = ref(new Array<{ payerId: String, name: String, percent: number, payment: number }>)
const itemsList = ref(new Array<{ itemNo: String, itemName: String, cost: number } >)

// function increment(x: number) {
//   return x++
// }

function clearList(list: Array<any>) {
  if (list.length) {
    let length = list.length
    for (let i = 0; i < length; i++) {
      list.pop();
    }
  }
}
async function addPayer() {

  payersList.value.push({ payerId: payerId.value.toString(), name: payerName.value, percent: 0, payment: 0 })
  payerId.value++
  payerName.value = ''
}

function updateTotal(newItem: number) {
  total.value = total.value + newItem
}

function addItem() {
  itemsList.value.push({ itemNo: itemNo.value.toString(), itemName: itemName.value, cost: itemCost.value})
  updateTotal(itemCost.value)
  itemCost.value = 0
  itemName.value = ''
  itemNo.value++
}

function verifyPercentages(percentages: Array<number>): boolean {
  if (percentages.reduce((x, y) => x + y, 0) == 100) return true
  return false
}

function calculate() {
  if (verifyPercentages(payersList.value.map(payer => payer.percent))) {
    payersList.value.map(payer => (payer.payment = total.value * payer.percent / 100))
  }
  else { alert("percentages must total to 100") }

}
</script>

<template>
  <div>
    <h1>Payment Calculator</h1>

    <form action="submit" @submit.prevent="addPayer">
      <label for="payers">Name: </label>
      <input v-model="payerName" id="payers" type="text" placeholder="payer">
      <button type="submit">Set as Payer</button>
    </form>
    <form action="submit" @submit.prevent="addItem">
      <label for="item-name">Enter an item: </label>
      <input v-model="itemName" id="item-name" type="text" >
      <label for="item-cost">Item cost: </label>
      $<input v-model="itemCost" id="item-cost" type="number" min=".01" step=".01" max="1000000">
      <button type="submit">Add Item</button>
    </form>
    <div v-if="itemsList.length">
      <div v-for="item in itemsList" :key="'item' + item.itemNo">
        <p>{{ (item.itemNo).toString() }}. {{ item.itemName }}, ${{ item.cost }}</p>
      </div>
    </div>
    <p class="text" >Items total: ${{ total }}</p>
    <form action="submit" @submit.prevent="calculate()">
      <p class="text">Enter your percentages</p>
      <div v-if="payersList.length">
        <div v-for="payer in payersList" :key="'payer' + payer.payerId">
          <label :for="'percent' + payer.payerId">{{ payer.name }}: </label>
          <input v-model="payer.percent" :id="'percent' + payer.payerId" type="number" min="0.01" max="100" step=".01" />%
        </div>
      </div>
      <button type="submit">Calculate totals</button>
      <button @click.prevent="clearList(payersList)">Clear list of payers</button>
    </form>


    <p class="text" v-for="payer in payersList" :key="'total' + payer.payerId">1: ${{ payer.payment.toFixed(2) }}, <br /></p>
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