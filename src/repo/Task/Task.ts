import { 
    Entity, Column, PrimaryGeneratedColumn, ManyToOne
} from "typeorm";
import { User } from "../User/User";

export enum Status {
    PENDING = 'Pending',
    INPROGRESS = 'in progress',
    Done = 'done'
  }

@Entity()
export class Task {
    @PrimaryGeneratedColumn()  id: number;
    @Column({ nullable: false })
    title: string
    @Column()
    description: string
    @Column()
    status: Status

    @ManyToOne(() => User, (user) => user.tasks)
    user: User
}
 