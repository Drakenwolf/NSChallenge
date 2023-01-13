import { DataSource } from "typeorm"
import {dbConfig} from "../config/db"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbConfig.HOST,
    port: parseInt(dbConfig.port),
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: "test",
})



AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })