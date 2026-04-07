"use client";

import React from "react";
import ShopByGrid from "./ShopByGrid";
import { 
  recipientNecklace, 
  recipientBracelet, 
  occasionHeart, 
  occasionAnniversary,
  occasionFestive,
  occasionCorporate,
  occasionOffice,
  occasionBridal,
  occasionWork
} from "@/assets";

const items = [
  { 
    name: "Wedding", 
    slug: "wedding", 
    image: occasionBridal
  },
  { 
    name: "Everyday", 
    slug: "everyday", 
    image: occasionWork
  },
  { 
    name: "Anniversary", 
    slug: "anniversary", 
    image: occasionAnniversary
  },
  { 
    name: "Birthday", 
    slug: "birthday", 
    image: occasionHeart
  },
  { 
    name: "Festive Collection", 
    slug: "festive", 
    image: occasionFestive
  },
  { 
    name: "Corporate Gifting", 
    slug: "corporate-gifting", 
    image: occasionCorporate
  },
  { 
    name: "Office Wear", 
    slug: "office-wear", 
    image: occasionOffice
  },
];

export default function ShopByOccasion() {
  return <ShopByGrid title="Shop by Occasion" items={items} />;
}
