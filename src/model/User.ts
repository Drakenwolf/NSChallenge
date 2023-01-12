import { UserRepository } from "../repo"

export class UserController {
    users() {
        return UserRepository.find()
    }
}