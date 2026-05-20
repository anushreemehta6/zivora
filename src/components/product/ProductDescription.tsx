"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  description: string;
};

export default function ProductDescription({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  // Split description by newlines to form structural elements
  const items = description
    .split(/\r?\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // If the description is short, render it fully formatted without expander
  const isShort = description.length < 240 && items.length <= 2;

  const renderItem = (item: string, idx: number) => {
    // 1. Check if the line is a header (ends with a colon)
    if (item.endsWith(":")) {
      return (
        <h4 key={idx} className="font-bold text-secondary text-xs tracking-wider uppercase mt-5 mb-2.5 first:mt-0">
          {item}
        </h4>
      );
    }

    // 2. Check if the line is a bullet point (starts with - or *)
    if (item.startsWith("-") || item.startsWith("*")) {
      const cleanText = item.replace(/^[-*]\s*/, "");
      return (
        <div key={idx} className="flex items-start gap-2.5 pl-2 my-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span className="whitespace-pre-wrap text-gray-600 text-sm leading-relaxed">{cleanText}</span>
        </div>
      );
    }

    // 3. Otherwise, render as a standard paragraph
    return (
      <p key={idx} className="whitespace-pre-wrap text-gray-500 text-sm leading-relaxed">
        {item}
      </p>
    );
  };

  if (isShort) {
    return (
      <div className="mb-10 p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100/80">
        <h3 className="font-bold text-xs text-secondary uppercase tracking-widest mb-4">
          About this Piece
        </h3>
        <div className="space-y-3">
          {items.map((item, idx) => renderItem(item, idx))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100/80 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-50">
      <h3 className="font-bold text-xs text-secondary uppercase tracking-widest mb-4">
        About this Piece
      </h3>

      {/* Description Content Container */}
      <div
        className={`relative transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1200px]" : "max-h-28"
        }`}
      >
        <div className="space-y-3 pb-2">
          {items.map((item, idx) => renderItem(item, idx))}
        </div>

        {/* Premium Fading Gradient Overlay when collapsed */}
        {/* {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none transition-opacity duration-300" />
        )} */}
      </div>

      {/* Luxury Read More / Read Less Toggle Button */}
      <div className="mt-4 flex">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-secondary group transition-colors duration-300 active:scale-95"
        >
          <span>{isExpanded ? "Read Less" : "Read More"}</span>
          {isExpanded ? (
            <ChevronUp size={12} className="transition-transform group-hover:-translate-y-0.5 duration-300" />
          ) : (
            <ChevronDown size={12} className="transition-transform group-hover:translate-y-0.5 duration-300" />
          )}
        </button>
      </div>
    </div>
  );
}
