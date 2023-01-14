import { User } from "./User";
import {AppDataSource} from "../../db/dataSource"


export const userRepository = AppDataSource.getRepository(User)