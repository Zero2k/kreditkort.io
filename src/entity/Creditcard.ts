import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

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
  amount: number;

  @Column("int")
  term_min: number;
  @Column("int")
  term_max: number;

  @Column("double precision")
  exchange_rate: number;

  @Column("int")
  age: number;

  @Column("text", { array: true })
  card_types: string[];

  @Column("boolean", { default: false })
  require_income: boolean;

  @Column("boolean", { default: false })
  check_uc: boolean;

  @Column("boolean", { default: false })
  bad_credit: boolean;

  @Column("boolean", { default: false })
  resident: boolean;
}
