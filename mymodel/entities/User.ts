import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity() //"User", { schema: "immersion_DB" })  TODO
export class User {
  @PrimaryGeneratedColumn()
  userIdx: number;

  @Column()
  email: string | null;

  @Column('varchar', { name: 'nickName', nullable: true, length: 20 })
  nickName: string | null;

  @Column('char', { name: 'phone', nullable: true, length: 11 })
  phone: string | null;

  @Column()
  password: string | null;

  @CreateDateColumn()
  signupTime: Date;
}
