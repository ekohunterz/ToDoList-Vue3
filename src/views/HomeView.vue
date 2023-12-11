<script setup lang="ts"></script>

<template>
  <main>
    <div class="container">
      <div
        class="bg-primary lg:w-1/3 flex flex-col p-6 mx-auto mt-12 text-quaternary shadow-md rounded-md"
      >
        <h1 class="text-3xl text-center font-bold">To Do List</h1>
        <p class="mt-6 text-center">
          A simple to-do list app built with Vue 3, Vue Router, Tailwind, Firebase and Pinia.
          Create, update, and delete tasks with user authentication by Firebase.
        </p>
        <router-link
          to="/login"
          class="bg-tertiary mt-6 py-4 w-1/2 mx-auto text-center rounded-md hover:bg-opacity-80 duration-300 ease-in-out"
          >Get Started</router-link
        >
      </div>
    </div>
  </main>
</template>
