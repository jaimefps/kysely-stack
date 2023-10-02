import { authenticate, dangerous_authenticateDev } from "./auth/middleware"
import { ApolloServer, AuthenticationError } from "apollo-server"
import { Context } from "./context"
import { schema } from "./schema"

/************************
 * Insert env configs
 ************************/
require("dotenv").config()

/************************
 * Cron jobs
 ************************/
import "./crons"

/******************************************
 * To keep the Node.js process running.
 * Review using PM2 to manage process.
 ******************************************/
setInterval(() => {}, 10000)

const isDev = process.env.NODE_ENV === "development"

const server = new ApolloServer({
  schema,
  cors: isDev,
  async context({ req, res }) {
    try {
      const memberInfo = isDev
        ? await dangerous_authenticateDev(req)
        : await authenticate(req)

      if (memberInfo) {
        // if (memberInfo.memberDb.blocked) {
        //   throw new ForbiddenError("Member blocked from application")
        // }
        return new Context(memberInfo)
      }
      throw new AuthenticationError("Failed to authenticate")
    } catch (e) {
      console.error(e)
      res.status(500).send()
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`🟢 Server: ${url}`)
})
