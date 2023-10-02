import * as cron from "node-cron"

function example() {
  console.log("--- cron job ping ---")
}

cron.schedule("*/5 * * * *", example)
