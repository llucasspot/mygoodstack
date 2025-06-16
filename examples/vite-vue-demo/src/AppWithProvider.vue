<script setup lang="ts">
import {containerByEnv} from "@mygoodstack/di-core";
import {DIProvider} from '../../../packages/di/di-vue';
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
