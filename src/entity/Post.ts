import {
  Entity,
  Column,
  CreateDateColumn,
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

  @Column("varchar", { length: 255})
  description: string;

  @Column("varchar", { length: 255 })
  image: string;

  @Column("text", { nullable: true })
  text: string;

  @Column("text", { array: true, nullable: true })
  categories: string[];

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: Date;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @BeforeInsert()
  async createSlug() {
    this.slug = await slugify(this.title);
  }
}
