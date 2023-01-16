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
    @Column({ unique: true,  nullable: false }) email: string
    @Column({ nullable: false })
    password: string
    @Column('simple-array', { nullable: true })
    tokens: string[];
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

}