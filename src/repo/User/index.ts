import { User } from "./User";
import {AppDataSource} from "../../db/dataSource"


export const UserRepository = AppDataSource.getRepository(User)