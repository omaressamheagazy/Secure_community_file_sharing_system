import '@/assets/css/style.css'
import './assets/css/satoshi.css'
import './assets/css/simple-datatables.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'
import 'swiper/swiper-bundle.css'
import 'nouislider/dist/nouislider.css'
import 'dropzone/dist/dropzone.css'
import Notifications from 'notiwind'

import dependencyInjectionPlugin from './plugins/dependencyInjection';

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import VueApexCharts from 'vue3-apexcharts'

import { createPinia } from 'pinia'


createApp(App)
    .use(createPinia())
    .use(VueApexCharts)
    .use(Notifications)
    .use(dependencyInjectionPlugin)
    .use(router)
    .mount('#app')
