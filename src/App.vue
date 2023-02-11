<!--
 * @Author: Nic
 * @Date: 2022-06-21 23:06:50
 * @LastEditTime: 2023-01-22 23:55:06
 * @LastEditors: Nic
 * @Description:
 * @FilePath: /mahjong-scorer/src/App.vue
-->
<template>
  <van-config-provider :theme="isDark ? 'dark' : 'light'">
    <main font-sans h-screen text="center gray-700 dark:gray-200">
      <!-- <StarportCarrier> -->
      <div flex flex-col h-screen>
        <!-- <main flex-1>
          <RouterView />
          <Footer />
        </main>
        <footer class="footer">
          <Tabbar />
        </footer> -->
        <RouterView />
      </div>
      <!-- </StarportCarrier> -->
    </main>
  </van-config-provider>
</template>

<script setup lang="ts">
import { isDark } from '~/composables'
</script>

<style scoped></style>
