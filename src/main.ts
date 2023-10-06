import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue);
app.use(router)
app
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  .component('Button', Button)
  .component('InputText', InputText);
  
app.mount('#app')
