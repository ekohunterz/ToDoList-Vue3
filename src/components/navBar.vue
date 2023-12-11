<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { createUserStore } from '@/stores/userStore'
import { useCurrentUser } from 'vuefire'

const userStore = createUserStore()

const router = useRouter()
const user = useCurrentUser()

const logout = () => {
  userStore.signOut()
}

onMounted(() => {
  if (user) {
    router.push('/todo')
  } else {
    router.push('/login')
  }
})
</script>

<template>
  <div class="bg-primary w-full text-quaternary shadow-md">
    <nav class="container flex gap-4 p-4 items-center">
      <router-link to="/" class="font-bold text-2xl mr-3 text-white">To-Do</router-link>
      <!-- <router-link to="/" class="font-bold">Home</router-link> -->
      <!-- <router-link to="/about" class="font-bold">About</router-link> -->
      <div class="inline-flex gap-8 ms-auto">
        <div v-if="user" class="hidden lg:flex">{{ user?.displayName ?? user?.email }}</div>
        <button v-if="user" class="font-bold" @click="logout">Sign Out</button>
      </div>
    </nav>
  </div>
</template>
