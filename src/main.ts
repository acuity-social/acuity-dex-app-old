import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'

import AcuityClient from './lib/AcuityClient'

const app = createApp(App).use(i18n).use(store).use(router)
app.provide('$acuityClient', new AcuityClient())
app.mount('#app')
