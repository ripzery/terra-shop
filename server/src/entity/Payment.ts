import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

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
  buyerEmail: string;

  @Column()
  buyerAddress: string;

  @Column()
  productId: number;

  @Column({type: 'timestamp'})
  validUntil: Date;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}
