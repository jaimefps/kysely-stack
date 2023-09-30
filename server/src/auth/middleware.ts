import { prisma } from "../prisma"
import { Request } from "express"
import { AuthSingleton } from "./singleton"

function getAuthToken(authorization: string | undefined) {
  return authorization?.split("Bearer ")[1].trim() ?? ""
}

function defaultUsername() {
  return `user_${Date.now().toString()}`
}

export async function authenticate(req: Request) {
  const token = getAuthToken(req.headers.authorization)
  const memberAuth = await AuthSingleton.verifyToken(token)
  const firebaseUid = memberAuth?.uid

  if (!firebaseUid) {
    return
  }

  const memberDb = await prisma.member.upsert({
    where: {
      firebase_id: firebaseUid,
    },
    create: {
      firebase_id: firebaseUid,
      username: defaultUsername(),
    },
    update: {},
  })

  if (memberDb && memberAuth) {
    return {
      memberAuth,
      memberDb,
    }
  }
}

export async function dangerous_authenticateDev(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("🔴 Error: dangerous_authenticateDev")
  }

  console.warn("🟡 Warning: dangerous_authenticateDev")
  const dangerousUid = process.env.DANGEROUS_FIREBASE_ID!
  const memberDb = (await prisma.member.upsert({
    where: {
      firebase_id: dangerousUid,
    },
    create: {
      firebase_id: dangerousUid,
      username: defaultUsername(),
    },
    update: {},
  })) as NonNullable<MemberDb>

  return {
    memberDb,
    memberAuth: {
      uid: dangerousUid,
      email: "jaime.pericas.saez@gmail.com",
    },
  } as MemberInfo
}
