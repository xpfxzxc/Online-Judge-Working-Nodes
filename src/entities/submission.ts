import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Code } from "./code";
import { Problem } from "./problem";
import { User } from "./user";

@Index("submission_pkey", ["id"], { unique: true })
@Entity("submission", { schema: "public" })
export class Submission extends BaseEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("character varying", { name: "status", default: () => "'Pending'" })
  status?: string;

  @Column("double precision", { name: "score", nullable: true, precision: 53 })
  score?: number | null;

  @Column("integer", { name: "time_usage", nullable: true })
  timeUsage?: number | null;

  @Column("integer", { name: "memory_usage", nullable: true })
  memoryUsage?: number | null;

  @Column("text", { name: "test_points", nullable: true })
  testPoints?: string | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date;

  @ManyToOne(() => Code, (Code) => Code.submissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "code_id", referencedColumnName: "id" }])
  code?: Code;

  @ManyToOne(() => Problem, (Problem) => Problem.submissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "problem_id", referencedColumnName: "id" }])
  problem?: Problem;

  @ManyToOne(() => User, (User) => User.submissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: User;

  constructor(init?: Partial<Submission>) {
    super();
    Object.assign(this, init);
  }
}
