import { createApp } from 'vue'
import './style.css'
import AppWithProvider from "./AppWithProvider.vue";

import './services/user.module';

createApp(AppWithProvider).mount('#app')
