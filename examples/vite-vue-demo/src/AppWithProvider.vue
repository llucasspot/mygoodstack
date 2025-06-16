<script setup lang="ts">
import {containerByEnv} from "@mygoodstack/di-vue";
import {DIProvider} from "@mygoodstack/di-vue";
import App from "./App.vue";

const nodeEnv = process.env.NODE_ENV as keyof typeof containerByEnv
console.log(`process.env.NODE_ENV : ${nodeEnv}`)

const container = containerByEnv[nodeEnv]

</script>

<template>
  <DIProvider :container="container">
    <App/>
  </DIProvider>
</template>
