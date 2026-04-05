import axios from "axios"

const GOLD_API = "https://www.goldapi.io/api/XAU/INR"

export async function fetchGoldPrice() {
  const res = await axios.get(GOLD_API, {
    headers: {
      "x-access-token": process.env.GOLD_API_KEY!,
      "Content-Type": "application/json"
    }
  })

  const data = res.data

  return {
    gold24k: data.price_gram_24k,
    gold22k: data.price_gram_22k
  }
}