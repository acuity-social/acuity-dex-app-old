<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
  {{ blockNumber }}
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'

const blockNumber = ref(0)


onMounted(async () => {
  const $acuityClient = inject('$acuityClient');
  await $acuityClient.init();
  $acuityClient.api.rpc.chain.subscribeNewHeads((lastHeader: any) => {
    blockNumber.value = lastHeader.number.toString();
  });
})
</script>
