<script setup lang="ts">
import {containerByEnv, useDI, useInstance} from "@mygoodstack/di-vue";
import HelloWorld from './components/HelloWorld.vue'
import {UserService} from "./services/user.service";

const {setContainer} = useDI();
const userService = useInstance(UserService);

</script>

<template>
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
  <HelloWorld :msg="`Vite + Vue + ${userService.getUserName()}`" />
    <button @click="setContainer(containerByEnv.development)">
      change container to development
    </button>
    <button @click="setContainer(containerByEnv.mock)">
      change container to mock
    </button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
