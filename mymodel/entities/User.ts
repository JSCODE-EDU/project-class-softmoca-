import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'nest_board' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userIdx' })
  userIdx: number;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('datetime', {
    name: 'signupTime',
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  signupTime: Date;

  @Column('varchar', { name: 'nickName', nullable: true, length: 20 })
  nickName: string | null;

  @Column('char', { name: 'phone', nullable: true, length: 11 })
  phone: string | null;
}
