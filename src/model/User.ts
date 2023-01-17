import { userRepository } from "../repo/User"
import { User } from "../repo/User/User"
import bcrypt from 'bcrypt';

const saltRounds = 8

export class UserModel {
    async find() {
        try {
            return await userRepository.find({    relations: {
                tasks: true,
            },})
        } catch (error) {
            return error
        }
    }

    async findOneByName(username: string) {
        try {
            return  await userRepository.findOneBy({
                username: username,
            }, )
        } catch (error) {
            return error
        }
    }

    async create(user: User) {
        user.password = await bcrypt.hash(user.password, saltRounds);
        try {
            return  await userRepository.save(user)
        } catch (error) {
            return error
        }
    }
    async update(id: number, fields :  Partial<User>) {
        if(fields.password){
            fields.password = await bcrypt.hash(fields.password, saltRounds);
        }
        try {
            return  await userRepository.update({id: id}, {...fields})
        } catch (error) {
            return error
        }
    }
    async delete (id: number) {
        
        try {
            return  await userRepository.delete({id})
        } catch (error) {
            return error
        }
    }
}
