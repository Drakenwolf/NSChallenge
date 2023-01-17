import bcrypt from "bcrypt"
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import { User } from "../repo/User/User";
import { TaskModel } from "../model/Task";
import { UserModel } from "../model/User";
import { Task } from "../repo/Task/Task";

export const SECRET_KEY: Secret = process.env.SECRET_KEY;

const taskModel = new TaskModel()
const userModel = new UserModel()
export class UserService {

   async  login(user: User) {
    const {username, password} = user

    try {
      const foundUser:User = await userModel.findOneByName(username);

      if (!foundUser) {
  
        return new Error('Name of user is not correct');
      }
   
      const isMatch = bcrypt.compareSync(password, foundUser.password);
      
      if (isMatch) {
        const token = jwt.sign({ id: foundUser.id?.toString(), username: foundUser.username }, SECRET_KEY, {
          expiresIn: '1 days',
        });

        let oldTokens = foundUser.tokens || [];

        if (oldTokens.length) {
          oldTokens = oldTokens.filter(t => {
           
            if (!this.isTokenExpired(t)) {
              return t;
            }
          });
        }
        try {
          const userUpdate = await userModel.update(foundUser.id,  {tokens: oldTokens.concat(token)});
          return { username, token: token, userUpdate };

        } catch (error) {
          return { error };
        }
      } else {
  
        return new Error('Password is not correct');
      }
    } catch (error) {

      return error;
    }
   }

   async  logout(username: string, token: string) {

    const foundUser:User = await userModel.findOneByName(username);
    if (!foundUser) {

      return new Error('Name of user is not correct');
    }

    const tokens = foundUser.tokens;

    const newTokens:string[]= tokens ?  tokens.filter(t => t !== token) : null

    const result = await userModel.update(foundUser.id,  {tokens: newTokens});


    
     return({ success: true, message: 'Sign out successfully!', result, user: { username,  }})
  }

    async create(user: User){
      return await userModel.create(user)

    }

    async read(username?:string){
      if(username) {
        return await userModel.findOneByName(username)
      }else {
        return await userModel.find()
      }
    }


    async update(id: number, fields :  Partial<User>){
      return await userModel.update( id, fields)

    }

    async delete(id: number){
      return await userModel.delete(id)
    }

    async createTask(username:string, task: Task){
      
      const user = await userModel.findOneByName(username)
      task.user =  user.id;
      return await taskModel.create(task)
    }

    async readTask(id?:number){
      if(id){
        return await taskModel.findOneById(id)
      }else{
        return await taskModel.find()
      }
    }

 
    async updateTask(id: number, task:Partial<Task>){
      return await taskModel.update(id, task)
    }
    async deleteTask(id: number){
      return await taskModel.delete(id)
    }



    isTokenExpired(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    return expired
  }
  }
  