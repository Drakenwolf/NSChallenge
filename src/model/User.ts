import { userRepository } from "../repo/User"
import { User } from "../repo/User/User"
export class UserModel {
    async find() {
        try {
            return await userRepository.find()
        } catch (error) {
            return error
        }
    }

    async findOneByName(username: string) {
        try {
            return  await userRepository.findOneBy({
                username: username,
            })
        } catch (error) {
            return error
        }
    }

    async create(user: User) {
        try {
            return  await userRepository.save(user)
        } catch (error) {
            return error
        }
    }
    async update(id: number, fields : User) {
        
        try {
            return  await userRepository.update({id: id}, {...fields})
        } catch (error) {
            return error
        }
    }
    async delete (username: string) {
        
        try {
            return  await userRepository.delete({username})
        } catch (error) {
            return error
        }
    }
}
