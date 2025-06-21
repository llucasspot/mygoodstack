<script lang="ts" setup>
import {ContainerI} from "@mygoodstack/di-core";
import {provide, ref, watch} from 'vue';
import {diContainerKey} from "./di-container-key";

const props = defineProps<{
  container: ContainerI;
}>();

const container = ref(props.container);
const setContainer = (newContainer: ContainerI) => {
  container.value = newContainer
}
watch(() => props.container, (newVal) => {
  container.value = newVal;
});

provide(diContainerKey, {container, setContainer});
</script>

<template>
  <slot/>
</template>
