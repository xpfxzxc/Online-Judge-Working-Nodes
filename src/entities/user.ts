import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Problem } from "./problem";
import { Submission } from "./submission";

@Index("user_email_key", ["email"], { unique: true })
@Index("user_pkey", ["id"], { unique: true })
@Index("user_name_key", ["name"], { unique: true })
@Entity("user", { schema: "public" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("character varying", { name: "name", unique: true })
  name?: string;

  @Column("character varying", { name: "email", unique: true })
  email?: string;

  @Column("character varying", { name: "password" })
  password?: string;

  @Column("character varying", { name: "role", default: () => "'user'" })
  role?: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date;

  @OneToMany(() => Problem, (Problem) => Problem.author)
  problems?: Problem[];

  @OneToMany(() => Submission, (Submission) => Submission.user)
  submissions?: Submission[];

  constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
  }
}
