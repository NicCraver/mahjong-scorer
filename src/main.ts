/*
 * @Author: Nic
 * @Date: 2022-06-21 23:06:50
 * @LastEditTime: 2023-01-30 17:55:49
 * @LastEditors: Nic
 * @Description:
 * @FilePath: /mahjong-scorer/src/main.ts
 */
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Vue3Lottie from 'vue3-lottie'
// import AV from 'leancloud-storage/live-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'vant/lib/index.css'

import 'vue3-lottie/dist/style.css'
import 'virtual:svg-icons-register'

// leancloud-storage 初始化
AV.init({
  appId: 'FTLIiSRHhLnIPBZFSrLuI8p6-gzGzoHsz',
  appKey: 'wgXxObTKPywUaJcH8FUAjUSN',
  serverURL: 'https://ftliisrh.lc-cn-n1-shared.com',
})

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(Vue3Lottie)
app.use(pinia)
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
