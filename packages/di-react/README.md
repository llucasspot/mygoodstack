# @mygoodstack/di-react

A lightweight dependency injection library for React applications, built on top of `@mygoodstack/di-core` (built on top of `tsyringe` Microsoft library). This library provides a simple and type-safe way to manage dependencies in your React components using the power of decorators and React Context.

## Features

- 🚀 Simple and intuitive API
- 🧩 First-class TypeScript support
- 🔄 Environment-based dependency injection
- 🧠 Supports adapter and singleton services
- ⚡️ Built with React hooks for optimal performance

## Examples

- [vite-react-demo](https://github.com/llucasspot/mygoodstack/blob/main/examples/vite-react-demo/src/main.tsx)

## Installation

```bash
# with npm
npm install @mygoodstack/di-react reflect-metadata
# or with yarn
yarn add @mygoodstack/di-react reflect-metadata
# or with pnpm
pnpm add @mygoodstack/di-react reflect-metadata
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
import { adapter } from '@mygoodstack/di-react';
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
import { adapter } from '@mygoodstack/di-react';
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
import { inject, singleton } from '@mygoodstack/di-react';
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
import { Module } from '@mygoodstack/di-react';
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

```tsx
// main.tsx

import 'reflect-metadata'; // <-- import this on top

import { DIProvider, containerByEnv } from '@mygoodstack/di-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './services/user.module'; // <-- import module

const AppWithDI = () => {
    
    // Choose the container between production / development / mock
    // it can be changed at runtime with hook useDI()
    
    const container = containerByEnv['development'];
    return (
        <DIProvider container={container}>
            <App />
        </DIProvider>
    );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithDI />
  </StrictMode>
);
```

### 4. Use dependencies in your components

```tsx
// App.tsx
import { useInstance } from '@mygoodstack/di-react';
import { UserService } from './services/user.service';

function HelloWorld() {
  const userService = useInstance(UserService);

  return (
    <div>
      <h1>Hello, {userService.getUserName()}!</h1>
    </div>
  );
}

export default App;
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

Provides the DI container to your React component tree.

```tsx
<DIProvider container={container}>
  <App />
</DIProvider>
```

## Environment-based Configuration

The library includes a `containerByEnv` object that allows you to configure different dependency graphs for different environments:

```typescript
import { containerByEnv } from '@mygoodstack/di-react';
```

## Best Practices

1. **Use interfaces for dependencies**: This makes your code more testable and follows the dependency inversion principle.

2. **Keep components focused**: Use dependency injection to keep your components focused on their primary responsibility.

3. **Leverage environment-based configuration**: Use the `containerByEnv` to provide different implementations for different environments.

4. **Use singletons for services**: Mark services that maintain state or manage resources as singletons.

## License

MIT
