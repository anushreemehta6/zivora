"use client";

import React from "react";
import ShopByGrid from "./ShopByGrid";
import { recipientNecklace, recipientBracelet, occasionHeart, occasionAnniversary } from "@/assets";

const items = [
  { 
    name: "For Her", 
    slug: "for-her", 
    image: recipientNecklace
  },
  { 
    name: "For Him", 
    slug: "for-him", 
    image: recipientBracelet
  },
  { 
    name: "For Kids", 
    slug: "for-kids", 
    image: occasionHeart
  },
  { 
    name: "For Self", 
    slug: "for-self", 
    image: occasionAnniversary
  },
];

export default function ShopByRecipient() {
  return <ShopByGrid title="Shop by Recipient" items={items} />;
}
