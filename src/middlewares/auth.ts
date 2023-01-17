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
