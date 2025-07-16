"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

export default function SelectStar(props: {
  star: number;
  setStar?: (star: number) => Promise<void>;
}) {
  const [hoverIndex, sethoverIndex] = useState<number | null>(null);

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => sethoverIndex(null)}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = props.star > i;
        const isNewFilled = hoverIndex !== null && i <= hoverIndex;

        return (
          <button
            key={i}
            onMouseEnter={() => {
              sethoverIndex(i);
            }}
            onClick={() => props.setStar?.(i + 1)}
          >
            <Star
              className={cn("w-6 h-6 cursor-pointer text-yellow-500", {
                "fill-yellow-500": isFilled,
                "-translate-y-0.5 fill-orange-400 text-orange-400": isNewFilled,
              })}
              style={{
                transitionDelay: `${i * 0.05}s`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
