<script setup lang="ts">
import IconGoogle from '@/components/IconGoogle.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = createUserStore()
const loginWithGoogle = () => {
  userStore.signInWithGoogle()
}

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const handleSubmit = async () => {
  await userStore.signInWithEmailAndPassword(email.value, password.value)
  errorMsg.value = userStore.errorMsg
}

onMounted(() => {
  if (userStore.currentUser()) {
    router.push('/todo')
  }
})
</script>

<template>
  <main>
    <div class="container">
      <div
        class="flex flex-col gap-4 lg:w-1/3 mx-auto bg-gradient-to-br mt-12 from-primary to-secondary rounded-lg p-6 shadow-md text-quaternary"
      >
        <h1 class="text-3xl text-center font-bold">Sign In</h1>
        <p class="mt-6">Sign In to your account</p>
        <form class="flex flex-col gap-4" action="" method="post" @submit.prevent="handleSubmit">
          <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
          <input
            type="email"
            v-model="email"
            class="bg-primary px-3 py-1 rounded-md"
            placeholder="Email"
          />
          <input
            type="password"
            v-model="password"
            class="bg-primary px-3 py-1 rounded-md"
            placeholder="Password"
          />
          <button
            class="bg-tertiary px-3 py-1 rounded-md hover:bg-opacity-80 duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
        <p>
          Don't have an account?
          <router-link to="/register" class="font-bold hover:text-tertiary hover:underline"
            >Register</router-link
          >
        </p>
        <div
          class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-quaternary after:mt-0.5 after:flex-1 after:border-t after:border-quaternary"
        >
          <p class="mx-4 mb-0 text-center font-semibold dark:text-white">Or</p>
        </div>
        <button
          @click="loginWithGoogle()"
          class="bg-quaternary inline-flex gap-3 text-center items-center mx-auto text-primary font-semibold px-3 py-1 hover:bg-opacity-80 ease-in-out duration-300 rounded-md"
        >
          <IconGoogle :width="18" :height="18" /> Sign In With Google
        </button>
      </div>
    </div>
  </main>
</template>
