<script lang="ts" setup>
import {ContainerI} from "@mygoodstack/di-core";
import {provide} from 'vue';
import {useState} from "../use-state";
import {diContainerKey} from "./di-container-key";

const props = defineProps<{
  container: ContainerI;
}>();

const [container, setContainer] = useState<ContainerI>(props.container);

provide(diContainerKey, {
  container,
  setContainer
});

</script>

<template>
  <slot/>
</template>
