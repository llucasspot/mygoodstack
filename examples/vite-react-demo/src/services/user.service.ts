import {inject, transient} from "@mygoodstack/di-react";
import {UserRepositoryPort} from "./user.repository.port";

@transient()
export class UserService {

    constructor(
        @inject(UserRepositoryPort)
        private readonly userRepository: UserRepositoryPort
    ) {
    }

    getUserName(): string {
        return this.userRepository.getUserName();
    }
}