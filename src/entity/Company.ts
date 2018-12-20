import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Creditcard } from "./Creditcard";

import { slugify } from "../utils/slugify";

@Entity("companies")
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  slug: string;

  @Column("text", { nullable: true })
  logo: string;

  @Column("varchar", { length: 255, nullable: true })
  website: string;

  @Column("text", { nullable: true })
  about: string;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, user => user.creditcards)
  user: User;

  @OneToMany(() => Creditcard, creditcards => creditcards.company, {
    onDelete: "CASCADE"
  })
  creditcards: Creditcard[];

  @BeforeInsert()
  async createSlug() {
    this.slug = await slugify(this.name);
  }
}
