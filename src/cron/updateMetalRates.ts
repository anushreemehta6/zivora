import axios from "axios"
import { prisma } from "../../lib/prisma"
import { fetchGoldPrice } from "../../lib/metalprice"

export async function updateMetalRates() {
  const prices = await fetchGoldPrice()

  await prisma.metalRate.upsert({
    where: {
      metal_purity: {
        metal: "GOLD",
        purity: "24K"
      }
    },
    update: {
      price: prices.gold24k
    },
    create: {
      metal: "GOLD",
      purity: "24K",
      price: prices.gold24k
    }
  })

  await prisma.metalRate.upsert({
    where: {
      metal_purity: {
        metal: "GOLD",
        purity: "22K"
      }
    },
    update: {
      price: prices.gold22k
    },
    create: {
      metal: "GOLD",
      purity: "22K",
      price: prices.gold22k
    }
  })
}