import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import is from 'core/utils/validation';
import { Image } from 'image/schema';

@Entity()
class User extends BaseEntity {
  static validations = {
    firstName: [is.required(), is.maxLength(100)],
    lastName: [is.required(), is.maxLength(100)],
    email: [is.required(), is.email(), is.maxLength(200)],
    password: [is.required(), is.minLength(8)],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @OneToMany(
    () => Image,
    image => image.user,
  )
  images: Image[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default User;
