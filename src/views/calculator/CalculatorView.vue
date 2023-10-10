<script setup lang="ts">
import { ref } from 'vue';

import type { payer, item } from "../../constants/typealiases"
 
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

function clearItems() {
  itemsList.value = []
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
    return true
  }
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

function calculateByPercentage() {
  if (verifyPercentages(payersList.value.map(payer => payer.percent))) {
    payersList.value.map(payer => (payer.payment = total.value * payer.percent / 100))
  }
  else { alert("percentages must total to 100") }

}

function calculateByItem() {
  if(payersList.value.map(payer => payer.payment).reduce((a, b) => (a + b)) > 0) {
    clearTotals()
  }
  for(let payer of payersList.value) {
    for(let item of itemsList.value) {
      const payerMatch = item.payers.includes(payer.name)
      if(payerMatch && item.payers.length) {
        payer.payment += (item.cost / item.payers.length)
      }
    }
  }
}

function clearTotals() {
  for(let payer of payersList.value) {
    payer.payment = 0
  }
}


</script>

<template>
  <div class="card flex justify-content-center">
    
    <form action="submit" @submit.prevent="addPayer">
      <label for="payers">Name: </label>
      <InputText v-model="payerName" id="payers" type="text" placeholder="payer" />
      <Button type="submit">Set as Payer</Button>
    </form>
    <form action="submit" @submit.prevent="addItem">
      <label for="item-name">Enter an item: </label>
      <InputText v-model="itemName" id="item-name" type="text" placeholder="chips"  />
      <label for="item-cost">Item cost: </label>
      $<InputNumber v-model="itemCost" id="item-cost" inputId="currency-us" mode="currency" currency="USD" locale="en-US" onfocus="this.value=''"  />
      <Button type="submit">Add Item</Button>
    </form>
    <div class="item-list">
      <h2>Items</h2>
      <div v-if="itemsList.length">
        <div v-for="item in itemsList" :key="'item' + item.itemNo">
          <p><span class="list-item-numbers">{{ (item.itemNo).toString() }}</span> {{ item.itemName }} --- ${{ item.cost }}</p>
        </div>
      </div>
    </div>
    <p class="text" >Items total: ${{ total.toFixed(2) }}</p>
    <label for="percent-mode-switch">Percent Mode</label>
    <InputSwitch id="percent-mode-switch" v-model="percentMode" @click="togglePercentMode" />
    
    <form v-if="percentMode" action="submit" @submit.prevent="calculateByPercentage">
      <p class="text">Enter your percentages</p>
      <div v-if="payersList.length">
        <div v-for="payer in payersList" :key="'payer' + payer.payerId">
          <label :for="'percent' + payer.payerId">{{ payer.name }}: </label>
          <InputNumber v-model="payer.percent" :id="'percent' + payer.payerId" inputId="percent" suffix="%" />
        </div>
      </div>
      <Button type="submit">Calculate totals</Button>
    </form>

    <form v-else action="submit" @submit.prevent="calculateByItem">
      <h2>Items per person</h2>
      <div v-if="payersList.length && itemsList.length" class="items-per-person-wrapper">
        <div v-for="item in itemsList" :key="item.itemName.toLowerCase() + item.itemNo">
          <p class="item-name">{{ item.itemName }}</p>
          <li v-for="payer in payersList" :key="payer.name.toLowerCase() + payer.payerId">
            <label :for="payer.name + item.itemName">{{ payer.name }}</label>
            <input :id="payer.name + item.itemName" :value="payer.name" type="checkbox" v-model="item.payers" />
          </li>
        </div>
      </div>
      <Button type="submit">Calculate totals</Button>
    </form>

    <Button @click.prevent="clearList(payersList)">Clear list of payers</Button>
    <Button @click.prevent="clearItems">Clear list of items</Button>
    <Button @click.prevent="clearTotals">Clear totals</Button>

    <p class="text" v-for="payer in payersList" :key="'total' + payer.payerId">{{ payer.payerId }} - {{ payer.name }}: ${{ payer.payment.toFixed(2) }} </p>
  </div>
</template>

<style scoped>
.item-list{
  text-align: left;
  min-height: 10vw;
}

.items-per-person-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 1vw;
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

.item-name {
  font-size: large;
  /* text-decoration: underline; */
  border: 1px solid;
  border-radius: 8px;
}

</style>