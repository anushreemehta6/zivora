"use client";

import React from "react";
import ShopByGrid from "./ShopByGrid";
import { themeMinimal, themeFloral, themeAntique, themeContemporary } from "@/assets";

const items = [
  { 
    name: "Minimalist", 
    slug: "minimalist", 
    image: themeMinimal
  },
  { 
    name: "Floral", 
    slug: "floral", 
    image: themeFloral
  },
  { 
    name: "Traditional", 
    slug: "traditional", 
    image: themeAntique
  },
  { 
    name: "Bohemian", 
    slug: "bohemian", 
    image: themeContemporary
  }
];

export default function ShopByTheme() {
  return <ShopByGrid title="Shop by Theme" items={items} />;
}
