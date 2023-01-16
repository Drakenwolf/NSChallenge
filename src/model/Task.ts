import { taskRepository } from "../repo/Task"
import { Task } from "../repo/Task/Task"
export class TaskModel {
    async find() {
        try {
            console.log(await taskRepository.find({relations: {
                user: true,
            }}))
            return await taskRepository.find({relations: {
                user: true,
            }})
        } catch (error) {
            return error
        }
    }

    async findOneByName(id: number) {
        try {
            return  await taskRepository.findOneBy({
                id: id,
            })
        } catch (error) {
            return error
        }
    }

    async create(task: Task) {
        try {
            return  await taskRepository.save(task)
        } catch (error) {
            return error
        }
    }
    async update(id: number, fields : Task) {
        
        try {
            return  await taskRepository.update({id: id}, {...fields})
        } catch (error) {
            return error
        }
    }
    async delete (id: number) {
        
        try {
            return  await taskRepository.delete({id})
        } catch (error) {
            return error
        }
    }
}
