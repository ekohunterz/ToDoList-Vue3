import { defineStore } from 'pinia'
import { addDoc, collection, doc, deleteDoc, setDoc } from 'firebase/firestore'
import router from '@/router'
import { getCurrentUser, useFirestore, useCollection, useCurrentUser } from 'vuefire'

function throwError(error: { code: string }) {
  throw error.code
}

export const createTodoStore = defineStore('todoStore', {
  state() {
    return {
      isLoading: false as boolean
    }
  },
  actions: {
    getTasks(user: any) {
      const db = useFirestore()
      if (user) {
        const q = collection(db, `users/${user?.uid}/todos`)
        const querySnapshot = useCollection(q)
        return querySnapshot
      }
    },
    async addTask(task: string, user: any) {
      this.isLoading = true
      const db = useFirestore()
      if (user) {
        await addDoc(collection(db, `users/${user?.uid}/todos`), {
          name: task,
          completed: false
        })
          .catch((error) => {
            throwError(error)
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    async deleteTask(id: string, user: any) {
      this.isLoading = true
      const db = useFirestore()
      if (user) {
        await deleteDoc(doc(db, `users/${user?.uid}/todos`, id))
          .catch((error) => {
            throwError(error)
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    async checkTask(task: any, user: any) {
      this.isLoading = true
      const db = useFirestore()
      if (user) {
        await setDoc(doc(db, `users/${user?.uid}/todos`, task.id), {
          name: task.name,
          completed: task.completed ? false : true
        })
          .catch((error) => {
            throwError(error)
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  }
})
