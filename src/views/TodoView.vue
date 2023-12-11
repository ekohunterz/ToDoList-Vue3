<script setup lang="ts">
import { ref } from 'vue'
import { createTodoStore } from '@/stores/todoStore'
import { createUserStore } from '@/stores/userStore'

const userStore = createUserStore()
const todoStore = createTodoStore()
const task = ref<string>('')
const errorMsg = ref<string>('')
const user = userStore.currentUser()
const isLoading = todoStore.isLoading
const todos = todoStore.getTasks(user)

const addTask = () => {
  if (user === null) return (errorMsg.value = 'User not signed in')
  if (task.value === '') return (errorMsg.value = 'Task cannot be empty')

  todoStore.addTask(task.value, user)
  task.value = ''
}

const deleteTask = (task: string) => {
  todoStore.deleteTask(task, user)
}

const checkTask = (task: any) => {
  todoStore.checkTask(task, user)
}
</script>

<template>
  <main class="mb-36">
    <div class="container text-center w-full">
      <div v-if="isLoading" class="text-3xl font-bold mt-18 text-quaternary">Loading</div>
      <div
        v-else
        class="lg:w-1/2 bg-gradient-to-r from-primary to-secondary mx-auto p-4 mt-12 rounded-lg shadow-md"
      >
        <h1 class="text-3xl font-bold text-quaternary drop-shadow-md">To Do App</h1>
        <div class="w-full h-1 text-red-500" v-show="errorMsg">{{ errorMsg }}</div>
        <div class="relative mt-6 flex gap-3">
          <input
            type="text"
            placeholder="Add Task"
            v-model="task"
            class="h-12 px-4 bg-transparent w-full border-4 text-quaternary rounded-full border-quaternary text-lg outline-none"
          />
          <button
            @click="addTask"
            class="absolute right-0 h-12 px-12 bg-quaternary border-4 border-quaternary text-xl text-tertiary z-90 rounded-r-full hover:bg-tertiary hover:border-tertiary hover:text-quaternary transition duration-300"
          >
            <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm"
              >+ Add</span
            >
          </button>
        </div>
        <div class="py-4 mt-4">
          <ul class="space-y-2">
            <li
              class="py-2 flex gap-4 w-full items-center rounded-full px-5 shadow-sm hover:bg-tertiary ease-in-out duration-300"
              v-for="task in todos"
              :key="task.id"
              :class="[task.completed ? 'bg-tertiary ' : 'bg-quaternary']"
            >
              <input
                type="checkbox"
                class="checkmark hover:cursor-pointer"
                :checked="task.completed"
                @click="checkTask(task)"
              />
              <div :class="[task.completed ? 'line-through ' : '']">{{ task.name }}</div>

              <button
                class="text-red-800 px-3 ms-auto py-1 hover:opacity-80 font-bold"
                @click="deleteTask(task.id)"
              >
                X
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
