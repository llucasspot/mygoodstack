<script setup lang="ts">
import {containerByEnv as containerByEnvCore, containerByEnv, ContainerI} from "@mygoodstack/di-vue";
import {DIProvider} from "@mygoodstack/di-vue";
import App from "./App.vue";

const nodeEnv = import.meta.env.VITE_APP_ENV as keyof typeof containerByEnv
console.log(`process.env.NODE_ENV : ${nodeEnv}`)
console.log(`containerByEnv equals : ${containerByEnv === containerByEnvCore}`)
const container: ContainerI = containerByEnv[nodeEnv]

container.consoleLog()

</script>

<template>
  <DIProvider :container="container">
    <App/>
  </DIProvider>
</template>
