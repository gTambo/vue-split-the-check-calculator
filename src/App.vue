<script setup lang="ts">
import { ref } from 'vue';

export type payer = { payerId: string, name: string, percent: number, payment: number, items: Array<string> }
export type item = { itemNo: number, itemName: string, cost: number, payers: Array<string> }

const payerItems = ref(new Array)
const total = ref(0)
const payerId = ref(1)
const payerName = ref('')
const itemNo = ref(1)
const itemName = ref('')
const itemCost = ref(0)
const payersList = ref(new Array<payer>)
const itemsList = ref(new Array<item>)
const percentMode = ref(false)

function togglePercentMode() {
  percentMode.value = !percentMode.value;
}

function clearList(list: Array<any>) {
  if (list.length) {
    let length = list.length
    for (let i = 0; i < length; i++) {
      list.pop();
    }
  }
}

function addPayer() {
  payersList.value.push({ payerId: payerId.value.toString(), name: payerName.value, percent: 0, payment: 0, items: payerItems.value })
  payerId.value++
  payerName.value = ''
  if(payersList.value.length <= 1 || checkForChangedPercentages()) {
    updatePercentages()
  }
}

function updatePayerItems(itemName: string) {
  for(let payer of payersList.value) {
    // payer.items.set(itemNum, true);
    payer.items.push(itemName)
  }
}

function checkForChangedPercentages(): boolean {
  const currentMeanPercentage = 1 / (payersList.value.length - 1) * 100 // comparing against payer list prior to most recent addition
  if (payersList.value.filter(payer => (payer.percent == currentMeanPercentage)).length == (payersList.value.length - 1)) {
    console.log('all percents equal')
    return true
  }
  console.log('percents not equal')
  return false
}
function updatePercentages() {
  const newPercent = 1 / payersList.value.length * 100
  payersList.value.map(payer => (payer.percent = newPercent))
}
function updateTotal(newItem: number) {
  total.value = total.value + newItem
}

function addItem() {
  itemsList.value.push({ itemNo: itemNo.value, itemName: itemName.value, cost: itemCost.value, payers: payersList.value.map(payer => payer.name) })
  updateTotal(itemCost.value)
  updatePayerItems(itemName.value)
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
      <input v-model="itemName" id="item-name" type="text" placeholder="chips" >
      <label for="item-cost">Item cost: </label>
      $<input v-model="itemCost" id="item-cost" type="number" min=".01" step=".01" max="1000000" onfocus="this.value=''" >
      <button type="submit">Add Item</button>
    </form>
    <div class="item-list" v-if="itemsList.length">
      <div v-for="item in itemsList" :key="'item' + item.itemNo">
        
        <p><span class="list-item-numbers">{{ (item.itemNo).toString() }}</span> {{ item.itemName }} --- ${{ item.cost }}</p>
      </div>
    </div>
    <p class="text" >Items total: ${{ total.toFixed(2) }}</p>
    <label for="percent-mode-switch">Percent Mode</label>
    <input id="percent-mode-switch" type="checkbox" v-model="percentMode" @click="togglePercentMode">
    <form v-if="percentMode" action="submit" @submit.prevent="calculate">
      <p class="text">Enter your percentages</p>
      <div v-if="payersList.length">
        <div v-for="payer in payersList" :key="'payer' + payer.payerId">
          <label :for="'percent' + payer.payerId">{{ payer.name }}: </label>
          <input v-model="payer.percent" :id="'percent' + payer.payerId" type="number" min="0.01" max="100" step=".01" onfocus="this.value=''" />%
        </div>
      </div>
      <button type="submit">Calculate totals</button>
      <button @click.prevent="clearList(payersList)">Clear list of payers</button>
    </form>

    <form v-else action="submit" @submit.prevent="">
      <h2>Items per person</h2>
      <div v-if="payersList.length && itemsList.length">
        <div v-for="item in itemsList" :key="item.itemName.toLowerCase() + item.itemNo">
          {{ item.itemName }} 
          <li v-for="payer in payersList" :key="payer.name.toLowerCase() + payer.payerId">
            {{ payer.name }}
            <label :for="payer.name + item.itemName">{{ item.payers.includes(payer.name) }}</label>
            <input :id="payer.name + item.itemName" :value="payer.name" type="checkbox" v-model="item.payers">
          </li>
        </div>
      </div>
    </form>

    <p class="text" v-for="payer in payersList" :key="'total' + payer.payerId">{{ payer.payerId }} - {{ payer.name }}: ${{ payer.payment.toFixed(2) }} </p>
  </div>
</template>

<style scoped>
.text {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 900;
  font-size: 35px;
  font-style: oblique;
}

.item-list{
  text-align: left;
}
.list-item-numbers  {
  font-family: 'Courier New', Courier, monospace;
  padding: 0.2vw;
  margin-left: 2vw;
  font-weight: bolder;
  background-color: aquamarine;
  color: darkblue;
  border: none;
  border-radius: 10%;
}

input {
  margin: 0.2rem 0.5rem;
}
button {
  margin: 0.2rem;
}
</style>