"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { actionClient, safeError } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

type StateType = { message?: string; error?: string };

export async function addReviewAction(
  prevState: StateType,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const review = formData.get("review") as string;

  if (name === "") return { error: "Name is required !" } as StateType;

  if (name === "mechant") return { error: "Invalid name !" } as StateType;

  await prisma.review.create({
    data: {
      name,
      review,
      stars: 3,
    },
  });

  revalidatePath("/");

  return { message: "Success !" } as StateType;
}

export const addReviewSafeAction = actionClient
  .inputSchema(
    z.object({
      name: z.string().min(1, "Name is required"),
      review: z.string().min(1, "Review is required"),
    })
  )
  .action(async ({ parsedInput: input }) => {
    if (input.name === "mechant") {
      throw new safeError("Invalid name !");
    }

    const newReview = await prisma.review.create({
      data: {
        name: input.name,
        review: input.review,
        stars: 4,
      },
    });

    revalidatePath("/");

    return newReview;
  });
