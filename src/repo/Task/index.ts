import { Task } from "./Task";
import {AppDataSource} from "../../db/dataSource"


export const taskRepository = AppDataSource.getRepository(Task)