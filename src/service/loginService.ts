import { UserModel } from "../model/User";
import bcrypt from "bcrypt"
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import { User } from "../repo/User/User";
export const SECRET_KEY: Secret = 'your-secret-key-here';

const userModel = new UserModel()
export async function login(user: User) {
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
           
            if (!isTokenExpired(t)) {
              console.log('%cloginService.ts line:33 t', 'color: white; background-color: #007acc;', t);
              return t;
            }
          });
        }
        try {
          console.log('%cloginService.ts line:33 oldTokens', 'color: white; background-color: #007acc;', oldTokens);
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

   function isTokenExpired(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    console.log(expired)
    return expired
  }
  