import {Scope} from "@mygoodstack/di-core";
import {adapter} from "@mygoodstack/di-react";
import {UserRepositoryPort} from "./user.repository.port";

@adapter(UserRepositoryPort, Scope.Singleton, 'mock')
export class UserRepositoryMock implements UserRepositoryPort {
    getUserName(): string {
        return 'user mocked name';
    }
}