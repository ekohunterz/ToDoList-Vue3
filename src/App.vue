<script setup lang="ts">
import { RouterView } from 'vue-router'

import navBar from './components/navBar.vue'
import FooterComponents from './components/FooterComponents.vue'
</script>

<template>
  <navBar />

  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

  <FooterComponents />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
