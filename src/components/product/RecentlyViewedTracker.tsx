"use client";

import { useEffect } from "react";

type Props = {
  slug: string;
};

export default function RecentlyViewedTracker({ slug }: Props) {
  useEffect(() => {
    if (typeof window === "undefined" || !slug) return;

    try {
      const stored = localStorage.getItem("recentlyViewed");
      let list: string[] = [];

      if (stored) {
        list = JSON.parse(stored);
      }

      if (!Array.isArray(list)) {
        list = [];
      }

      // Filter out the current slug if it was already in the list
      list = list.filter((item) => item !== slug);

      // Add the current slug at the beginning (most recent)
      list.unshift(slug);

      // Cap the history at 10 items
      const updatedList = list.slice(0, 10);

      localStorage.setItem("recentlyViewed", JSON.stringify(updatedList));
    } catch (error) {
      console.error("Failed to update recently viewed products in localStorage:", error);
    }
  }, [slug]);

  return null;
}
