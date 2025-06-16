import {adapter} from "@mygoodstack/di-react/src";
import {UserRepositoryPort} from "./user.repository.port";

@adapter(UserRepositoryPort, 'mock')
export class UserRepositoryMock implements UserRepositoryPort {
    getUserName(): string {
        return 'user mocked name';
    }
}