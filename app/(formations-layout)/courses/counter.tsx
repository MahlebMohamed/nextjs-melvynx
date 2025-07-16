"use client";

import { Button } from "@/components/ui/button";
import React, { PropsWithChildren, useState } from "react";

export default function Counter(props: PropsWithChildren) {
  const [count, setCount] = useState(0);
  console.log(count);
  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>{props.children}</Button>
    </div>
  );
}
