import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'user/schema';

@Entity()
class Image extends BaseEntity {
  static validations = {};

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  originName: string;

  @Column('varchar')
  url: string;

  @Column('varchar')
  encoding: string;

  @Column('varchar')
  mimeType: string;

  @Column('varchar')
  destination: string;

  @Column('varchar')
  filename: string;

  @Column('int')
  size: number;

  @ManyToOne(
    () => User,
    user => user.images,
  )
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default Image;
