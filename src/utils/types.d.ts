import { IUser } from '../interfaces';

// types for verify-jwt
declare global {
  namespace Express {
   	export interface Request {
      user: IUser
    }
  }
}
