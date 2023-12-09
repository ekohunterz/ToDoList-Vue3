import { defineStore } from 'pinia'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import router from '@/router'
import { useCurrentUser, getCurrentUser } from 'vuefire'

function throwError(error: { code: string }) {
  throw error.code
}

export const createUserStore = defineStore('userStore', {
  state() {
    return {
      isLoading: false as boolean
    }
  },
  actions: {
    async signInWithGoogle() {
      this.isLoading = true
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      await signInWithPopup(auth, provider)
        .then(() => {
          router.go(0)
        })
        .catch((error) => {
          throwError(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    signOut() {
      this.isLoading = true
      const auth = getAuth()
      auth
        .signOut()
        .then(() => {
          router.go(0)
        })
        .catch((error) => {
          throwError(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    currentUser() {
      return useCurrentUser()
    }
  }
})
