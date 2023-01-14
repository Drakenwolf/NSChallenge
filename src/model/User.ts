import { UserRepository } from "../repo/User"

export class UserController {
    find() {
        try {
            return UserRepository.find()
        } catch (error) {
            return error
        }
    }
}