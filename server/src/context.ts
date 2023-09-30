import { TaskDataSource } from "./data-sources"
import { prisma } from "./prisma"
import { db } from "./database"

export class Context {
  db = db
  prisma = prisma
  member: MemberInfo

  constructor(member: MemberInfo) {
    this.member = member
  }

  get tasks() {
    return new TaskDataSource(this)
  }
}
