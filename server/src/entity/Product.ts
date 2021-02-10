import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  title: string;

  @Column()
  desc: string;
}
