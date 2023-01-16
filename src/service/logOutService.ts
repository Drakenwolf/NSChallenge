import { UserModel } from "../model/User";
import bcrypt from "bcrypt"
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { User } from "../repo/User/User";

export const SECRET_KEY: Secret = 'your-secret-key-here';

const userModel = new UserModel()
export async function logout(req: Request, res: Response,) {
    const {username} = req.body
    const {token} = res.locals


    const foundUser:User = await userModel.findOneByName(username);
    if (!foundUser) {

      return new Error('Name of user is not correct');
    }

    const tokens = foundUser.tokens;
    const newTokens:string[]= tokens ?  tokens.filter(t => t !== token) : null

    const result = await userModel.update(foundUser.id,  {tokens: newTokens});


    
     return({ success: true, message: 'Sign out successfully!', result, user: { username,  }})
  }

   

