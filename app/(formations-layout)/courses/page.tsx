import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import SelectStar from "./select-star";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateTitleForm } from "./edit-title";

export default async function Page() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const userAgentQ = userAgent({
    headers: await headers(),
  });

  async function setNewStar(reviewId: string, star: number) {
    "use server";

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        stars: star,
      },
    });

    revalidatePath("/courses");
  }

  async function setNewTitle(reviewId: string, newTitle: string) {
    "use server";

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        name: newTitle,
      },
    });

    revalidatePath("/courses");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses !</CardTitle>
        <CardDescription>{userAgentQ.browser.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <SelectStar
                  setStar={setNewStar.bind(null, review.id)}
                  star={review.stars}
                />
                <span className="text-sm font-medium">{review.stars}</span>
              </div>
              <UpdateTitleForm
                setReviewTitle={async (newTitle) => {
                  "use server";

                  await setNewTitle(review.id, newTitle);
                }}
                className="font-bold text-lg"
              >
                {review.name}
              </UpdateTitleForm>
              <CardDescription>{review.review}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </CardContent>

      <Card>
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <LongLoadingComponent />
        </Suspense>
      </Card>
    </Card>
  );
}

async function LongLoadingComponent() {
  const reviews = await prisma.review.count();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <p className="text-2xl mx-8">reviews {reviews}</p>;
}
