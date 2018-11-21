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

import { slugify } from "../utils/slugify";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("varchar", { length: 255 })
  slug: string;

  @Column("text", { nullable: true })
  text: string;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @BeforeInsert()
  async createSlug() {
    this.slug = await slugify(this.title);
  }
}
