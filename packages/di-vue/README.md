# @mygoodstack/di-vue

A lightweight dependency injection library for Vue 3 applications, built on top of `@mygoodstack/di-core` (built on top of `tsyringe` Microsoft library). This library provides a simple and type-safe way to manage dependencies in your Vue components using the power of decorators..

## Features

- 🚀 Simple and intuitive API
- 🧩 First-class TypeScript support
- 🔄 Environment-based dependency injection
- 🧠 Supports adapter and singleton services
- ⚡️ Built with Vue hooks for optimal performance

## Examples

- [vite-vue-demo](https://github.com/llucasspot/mygoodstack/blob/main/examples/vite-vue-demo/src/main.ts)

## Installation

```bash
# with npm
npm install @mygoodstack/di-vue reflect-metadata
# or with yarn
yarn add @mygoodstack/di-vue reflect-metadata
# or with pnpm
pnpm add @mygoodstack/di-vue reflect-metadata
```

Make sure your `tsconfig.json` includes the following compiler options:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
}
```

## Quick Start

### 1. Define your services

```typescript
// user.repository.port.ts
export interface UserRepositoryPort {
  getUserName(): string;
}
```

```typescript
// user.repository.mock.ts
import { adapter } from '@mygoodstack/di-vue';
import { UserRepositoryPort } from './user.repository.port';

// to bind UserRepositoryPort UserRepositoryMockAdapter
//    only for mock container
@adapter(UserRepositoryPort, 'mock')
export class UserRepositoryMockAdapter implements UserRepositoryPort {
  getUserName(): string {
    return 'Mock User';
  }
}
```

```typescript
// user.repository.api.ts
import { adapter } from '@mygoodstack/di-vue';
import { UserRepositoryPort } from './user.repository.port';

// to bind UserRepositoryPort UserRepositoryApiAdapter
//    on the default / fallback container
@adapter(UserRepositoryPort)
export class UserRepositoryApiAdapter implements UserRepositoryPort {
    getUserName(): string {
        // use api call
        return 'User';
    }
}
```

```typescript
// user.service.ts
import { inject, singleton } from '@mygoodstack/di-vue';
import { UserRepositoryPort } from './user.repository.port';

@singleton()
export class UserService {
  constructor(
    @inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort
  ) {}

  getUserName(): string {
    return this.userRepository.getUserName();
  }
}
```

### 2. Create a module to register your services

```typescript
// user.module.ts
import { Module } from '@mygoodstack/di-vue';
import { UserRepositoryMock } from './user.repository.mock';
import { UserService } from './user.service';

@Module({
  providers: [
    UserService, 
    UserRepositoryMockAdapter, 
    UserRepositoryApiAdapter
  ],
})
export class UserModule {}
```

### 3. Set up the DI Provider in your app

```typescript
// main.ts

import 'reflect-metadata'; // <-- import this on top

import { createApp } from 'vue'
import './style.css'
import AppWithProvider from "./AppWithProvider.vue";

import './services/user.module';

createApp(AppWithProvider)
    .mount('#app')
```

```vue
// AppWithProvider.vue

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
```

### 4. Use dependencies in your components

```vue
// App.vue
<script setup lang="ts">
    import {useInstance} from "@mygoodstack/di-vue";
    import HelloWorld from './components/HelloWorld.vue'
    import {UserService} from "./services/user.service";

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
</template>
```

## API Reference

### Decorators

#### `@inject(token)`

Marks a constructor parameter for dependency injection.

```typescript
constructor(
  @inject(LoggerService)
  private readonly logger: LoggerService
) {}
```

#### `@singleton()`

Marks a class as a singleton service. The same instance will be returned for all requests.

```typescript
@singleton()
class LoggerService {
  // ...
}
```

#### `@adapter(port, container = 'production')`

Register a port with singleton adapter service on a container. The same instance will be returned for all requests.

```typescript
@adapter(UserRepositoryPort, 'mock')
class UserRepositoryMockAdapter implements UserRepositoryPort {
  // ...
}
```

### Hooks

#### `useInstance<T>(token: Token<T>): T`

Resolves an instance of the specified token from the DI container.

```typescript
const userService = useInstance(UserService);
```

### Components

#### `DIProvider`

Provides the DI container to your Vue component tree.

```vue
<DIProvider :container="container">
    <App/> 
</DIProvider>
```

## Environment-based Configuration

The library includes a `containerByEnv` object that allows you to configure different dependency graphs for different environments:

```typescript
import { containerByEnv } from '@mygoodstack/di-vue';
```

## Best Practices

1. **Use interfaces for dependencies**: This makes your code more testable and follows the dependency inversion principle.

2. **Keep components focused**: Use dependency injection to keep your components focused on their primary responsibility.

3. **Leverage environment-based configuration**: Use the `containerByEnv` to provide different implementations for different environments.

4. **Use singletons for services**: Mark services that maintain state or manage resources as singletons.

## License

MIT
