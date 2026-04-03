"use client";

import React from "react";
import ShopByGrid from "./ShopByGrid";
import { occasionBridal, occasionWork, occasionAnniversary, occasionHeart } from "@/assets";

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
];

export default function ShopByOccasion() {
  return <ShopByGrid title="Shop by Occasion" items={items} />;
}
