import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../model/User';
export const SECRET_KEY: Secret = 'your-secret-key-here';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}
const userModel = new UserModel()
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');
   const {username} = req.params
   const user = await userModel.findOneByName(username)


  console.log('%cauth.ts line:17 user', 'color: white; background-color: #007acc;', user);
  console.log('%cauth.ts line:18 user.tokens', 'color: white; background-color: #007acc;', user.tokens);
   
    console.log('%cauth.ts line:20 user.tokens.includes(token)', 'color: white; background-color: #007acc;', user.tokens.includes(token));
  if (!token) {
     throw new Error("");
   }

   if (!token) {
    throw new Error();
  }

  if(!user.tokens.includes(token)){
    throw new Error();
  }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;
   res.locals.token=token;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};
