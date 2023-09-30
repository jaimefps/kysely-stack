import { Context } from "../context"

export class TaskDataSource {
  constructor(protected ctx: Context) {
    this.ctx = ctx
  }

  get({ id, complete }: { id: un<number>; complete: un<boolean> }) {
    let qb = this.ctx.db.selectFrom("Task")

    if (typeof id === "number") {
      qb = qb.where("id", "=", id)
    }

    if (typeof complete === "boolean") {
      qb = qb.where("complete", "=", complete)
    }

    return qb.selectAll().execute()
  }

  create({ title }: { title: string }) {
    return this.ctx.db
      .insertInto("Task")
      .values({
        title,
      })
      .returningAll()
      .executeTakeFirstOrThrow()
  }

  update({
    id,
    title,
    complete,
  }: {
    id: number
    title: un<string>
    complete: un<boolean>
  }) {
    return this.ctx.db
      .updateTable("Task")
      .where("id", "=", id)
      .set({
        ...(typeof complete === "boolean" && { complete }),
        ...(typeof title === "string" && { title }),
      })
      .execute()
  }

  delete({ id }: { id: number }) {
    return this.ctx.db
      .deleteFrom("Task")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst()
  }
}
