import { defineStore } from 'pinia'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import router from '@/router'
import { useCurrentUser } from 'vuefire'

function throwError(error: { code: string }) {
  throw error.code
}

export const createUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: null as any,
      isLoading: false as boolean,
      errorMsg: '' as any
    }
  },
  actions: {
    async register(email: string, password: string) {
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.user = userCredential.user
          router.push({ name: 'todo' })
        })
        .catch((error) => {
          this.errorMsg = error.code
        })
    },
    async signInWithEmailAndPassword(email: string, password: string) {
      this.isLoading = true
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push({ name: 'todo' })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMsg = 'Invalid email'
              break
            case 'auth/wrong-password':
              this.errorMsg = 'Incorrect password'
              break
            case 'auth/user-not-found':
              this.errorMsg = 'No account found with that email'
              break
            default:
              this.errorMsg = 'Invalid email or password'
              break
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    async signInWithGoogle() {
      this.isLoading = true
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      await signInWithPopup(auth, provider)
        .then(() => {
          router.push({ name: 'todo' })
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
          router.push({ name: 'login' })
        })
        .catch((error) => {
          throwError(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    currentUser() {
      return useCurrentUser().value
    }
  }
})
