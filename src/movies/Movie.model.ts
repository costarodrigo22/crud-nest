import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MovieModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  author: string;

  @Column('int')
  classification: number;

  @Column({ length: 300 })
  summary: string;

  @Column({ length: 50 })
  director: string;

  @Column('int')
  releaseyear: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
