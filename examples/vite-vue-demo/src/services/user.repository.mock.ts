import {adapter, Scope} from "@mygoodstack/di-vue";
import {UserRepositoryPort} from "./user.repository.port";

@adapter(UserRepositoryPort, Scope.Singleton, 'mock')
export class UserRepositoryMock implements UserRepositoryPort {
    getUserName(): string {
        return 'user mocked name';
    }
}