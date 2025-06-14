import {adapter} from "@mygoodstack/di-core";
import {UserRepositoryPort} from "./user.repository.port";

@adapter(UserRepositoryPort, 'mock')
export class UserRepositoryMock implements UserRepositoryPort {
    getUserName(): string {
        return 'user mocked name';
    }
}