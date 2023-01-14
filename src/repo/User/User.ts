import { 
    Entity, Column, PrimaryGeneratedColumn, OneToMany
} from "typeorm";
import { Task } from "../Task/Task";

@Entity()
export class User {
    @PrimaryGeneratedColumn()  id: number;
    @Column({
        length: 100
    })  username: string;
    @Column({ unique: true }) email: string
    @Column({ nullable: false })
    password: string
    
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

}
 