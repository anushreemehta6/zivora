import cron from "node-cron"
import { updateMetalRates } from "./updateMetalRates"

cron.schedule("0 6 * * *", async () => {
  console.log("Updating metal prices...")
  await updateMetalRates()
})