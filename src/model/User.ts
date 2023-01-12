import { UserRepository } from "../repo/User"

export class UserController {
    users() {
        return UserRepository.find()
    }
}