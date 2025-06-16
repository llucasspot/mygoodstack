import {inject, singleton} from "@mygoodstack/di-react";
import {UserRepositoryPort} from "./user.repository.port";

@singleton()
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