import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity("creditcards")
export class Creditcard extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("text", { nullable: true })
  logo: string;

  @Column("text", { nullable: true })
  information: string;

  @Column("varchar", { length: 255 })
  url: string;

  @Column("double precision")
  interest: number;
  @Column("int")
  interest_fee: number;

  @Column("int")
  amount_min: number;
  @Column("int")
  amount_max: number;

  @Column("int")
  term_min: number;
  @Column("int")
  term_max: number;

  @Column("double precision")
  exchange_rate: number;

  @Column("int")
  annual_fee: number;

  @Column("int")
  age: number;

  @Column("text", { array: true })
  card_types: string[];

  @Column("boolean", { default: false })
  require_income: boolean;

  @Column("boolean", { default: true })
  check_uc: boolean;

  @Column("boolean", { default: false })
  bad_credit: boolean;

  @Column("boolean", { default: true })
  resident: boolean;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, user => user.creditcards)
  user: User;
}
