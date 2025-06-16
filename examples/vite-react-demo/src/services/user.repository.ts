import {adapter} from "@mygoodstack/di-react/src";
import {UserRepositoryPort} from "./user.repository.port";

@adapter(UserRepositoryPort)
export class UserRepository implements UserRepositoryPort {
    getUserName(): string {
        return 'user name';
    }
}