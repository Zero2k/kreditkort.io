import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

import { slugify } from "../utils/slugify";

@Entity("loans")
export class Loan extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  slug: string;

  @Column("text", { nullable: true })
  logo: string;

  @Column("text", { nullable: true })
  information: string;

  @Column("varchar", { length: 255 })
  url: string;

  @Column("double precision")
  interest: number;
  @Column("double precision", { nullable: true })
  interest_max: number;

  @Column("int")
  amount_min: number;
  @Column("int")
  amount_max: number;

  @Column("int", { nullable: true })
  setup_fee: number;

  @Column("int", { nullable: true })
  administration_fee: number;

  @Column("text", { nullable: true })
  administration_fee_text: string;

  @Column("int")
  age: number;

  @Column("text", { array: true, nullable: true })
  features: string[];

  @Column("text", { array: true, nullable: true })
  advantages: string[];

  @Column("text", { array: true, nullable: true })
  disadvantages: string[];

  @Column("text", { array: true, nullable: true })
  loan_types: string[];

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

  @Column("uuid")
  companyId: string;

  @ManyToOne(() => User, user => user.loans)
  user: User;

  @ManyToOne(() => Company, company => company.loans, {
    onDelete: "CASCADE"
  })
  company: Company;

  @BeforeInsert()
  async createSlug() {
    this.slug = await slugify(this.name);
  }
}
