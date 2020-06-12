import { BaseEntity, Column, Entity, Index, OneToMany } from "typeorm";
import { Submission } from "./submission";

@Index("code_pkey", ["id"], { unique: true })
@Entity("code", { schema: "public" })
export class Code extends BaseEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("character varying", { name: "lang" })
  lang?: string;

  @Column("text", { name: "content" })
  content?: string;

  @OneToMany(() => Submission, (Submission) => Submission.code)
  submissions?: Submission[];

  constructor(init?: Partial<Code>) {
    super();
    Object.assign(this, init);
  }
}
