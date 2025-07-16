"use client";

import { cn } from "@/lib/utils";
import { Check, Edit } from "lucide-react";
import { useOptimistic, useRef, useState, useTransition } from "react";

export function UpdateTitleForm(props: {
  children: string;
  setReviewTitle?: (newTitle: string) => void;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useOptimistic(
    props.children,
    (_, newTitle: string) => newTitle
  );
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLInputElement>(null);

  function submit() {
    const newTitle = ref.current?.value || "";
    props.setReviewTitle?.(newTitle);
    startTransition(() => {
      setTitle(newTitle);
    });
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="group flex items-center gap-2">
        <input
          className={cn(props.className)}
          defaultValue={props.children}
          ref={ref}
          style={{ width: "100%", boxSizing: "border-box" }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submit();
            }
          }}
        />
        <button
          className="group-hover:opacity-100 opacity-0 cursor-pointer p-1 bg-accent"
          onClick={() => {
            submit();
          }}
        >
          <Check size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-2">
      <p className={cn(props.className, { "animate-pulse": isPending })}>
        {title}
      </p>
      <button
        className="group-hover:opacity-100 opacity-0 cursor-pointer p-1 bg-accent"
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => {
            ref.current?.focus();
          }, 1);
        }}
      >
        <Edit size={16} />
      </button>
    </div>
  );
}
