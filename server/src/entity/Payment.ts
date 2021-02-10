import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  address: string;

  @Column()
  completed: boolean;

  @Column({type: 'timestamp'})
  valid_until: Date;

  @Column({type: 'timestamp'})
  created_at: Date;

  @Column({type: 'timestamp'})
  updated_at: Date;
}
