import {Module} from "@mygoodstack/di-react";
import {UserRepositoryMock} from "./user.repository.mock";
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";

@Module({
    providers: [
        UserService,
        UserRepository,
        UserRepositoryMock,
    ],
})
export class UserModule {
}
