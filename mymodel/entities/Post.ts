import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post', { schema: 'nest_board' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('varchar', { name: 'content', length: 255 })
  content: string;

  @Column('datetime', {
    name: 'created_at',
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;
}
