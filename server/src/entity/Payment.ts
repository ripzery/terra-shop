import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import {Product} from '../entity/Product';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  address: string;

  @Column()
  mnemonic: string;

  @Column()
  amount: number;

  @Column('boolean', {default: false})
  completed: boolean;

  @Column()
  productId: number;

  @Column({type: 'timestamp'})
  valid_until: Date;

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date;
}
