import { defineStore } from 'pinia'
import { addDoc, collection, doc, deleteDoc, setDoc, orderBy, query } from 'firebase/firestore'

import { useFirestore, useCollection } from 'vuefire'

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
        const q = query(collection(db, `users/${user?.uid}/todos`), orderBy('dateAdded', 'desc'))
        const querySnapshot = useCollection(q, {
          ssrKey: user?.uid
        })
        return querySnapshot
      }
    },
    async addTask(task: string, user: any) {
      this.isLoading = true
      const db = useFirestore()
      if (user) {
        await addDoc(collection(db, `users/${user?.uid}/todos`), {
          name: task,
          dateAdded: new Date(),
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
          dateAdded: task.dateAdded,
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
