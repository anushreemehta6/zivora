"use client";

import React from "react";
import ShopByGrid from "./ShopByGrid";
import { 
  themeMinimal, 
  themeFloral, 
  themeAntique, 
  themeContemporary,
  themeInfinity,
  themeEvilEye,
  themeLuxury,
  themeCouple
} from "@/assets";

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
  },
  { 
    name: "Infinity Symbols", 
    slug: "infinity-symbols", 
    image: themeInfinity
  },
  { 
    name: "Evil Eye Protection", 
    slug: "evil-eye-protection", 
    image: themeEvilEye
  },
  { 
    name: "Luxury", 
    slug: "luxury", 
    image: themeLuxury
  },
  { 
    name: "Couple Jewellery", 
    slug: "couple-jewellery", 
    image: themeCouple
  },
];

export default function ShopByTheme() {
  return <ShopByGrid title="Shop by Theme" items={items} />;
}
