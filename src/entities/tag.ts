import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Problem } from "./problem";

@Index("tag_pkey", ["id"], { unique: true })
@Index("tag_name_key", ["name"], { unique: true })
@Entity("tag", { schema: "public" })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("character varying", { name: "name", unique: true })
  name?: string;

  @ManyToMany(() => Problem, (Problem) => Problem.tags)
  problems?: Problem[];

  constructor(init?: Partial<Tag>) {
    super();
    Object.assign(this, init);
  }
}
