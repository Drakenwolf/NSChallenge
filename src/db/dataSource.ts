import { DataSource } from "typeorm"
import {dbConfig} from "../config/db"
import { Task } from "../repo/Task/Task"
import { User } from "../repo/User/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbConfig.HOST,
    port: parseInt(dbConfig.port),
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    synchronize: true,
    logging: true,
    entities: [User,Task],
})



AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })