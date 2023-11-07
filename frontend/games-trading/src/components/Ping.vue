<template>
  <!-- <div>
    <p>{{ msg }}</p>
  </div> -->
  <div class="flex justify-center items-center h-screen">
    <div class="space-x-4">
      <h1 class="text-3xl mb-4 text-purple-500">
        How to Install Tailwind Daisyui In Vue 3
      </h1>
      <h2>{{ msg }}</h2>
      <button class="btn">Button</button>
      <button class="btn btn-primary">Button</button>
      <button class="btn btn-secondary">Button</button>
      <button class="btn btn-accent">Button</button>
      <button class="btn btn-ghost">Button</button>
      <button class="btn btn-link">Button</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Ping',
  data() {
    return {
      msg: 'Hello!',
    };
  },
  methods: {
    getMessage() {
      const path = 'http://localhost:5001/ping';
      axios.get(path)
        .then((res) => {
          this.msg = res.data;
        })
        .catch((error) => {

          console.error(error);
        });
    },
  },
  created() {
    this.getMessage();
  },
};
</script>