import { 
    Entity, Column, PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()  id: number;
    @Column({
        length: 100
    })  username: string;
    @Column({ unique: true }) email: string
    @Column({ nullable: false })
    password: string

    // tasks

    // @OneToMany(() => TaskEntity, (task: TaskEntity) => task.user, {
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   })
    //   tasks: Array<TaskEntity>
}
 