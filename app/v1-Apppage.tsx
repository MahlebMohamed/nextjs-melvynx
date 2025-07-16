import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { PageLayout } from "@/layout";
import { prisma } from "@/lib/prisma";
import { X } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { UpdateTitleForm } from "./(formations-layout)/courses/edit-title";
import ReviewForm from "./(formations-layout)/courses/review-form";
import SelectStar from "./(formations-layout)/courses/select-star";

export default async function Home() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  async function changeStar(reviewId: string, star: number) {
    "use server";

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        stars: star,
      },
    });

    revalidatePath("/");
  }

  return (
    <PageLayout>
      <h1>Learn Next.js</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan de formation
      </Link>
      <ModeToggle />
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="relative">
            <div className="absolute right-4 top-5">
              <form>
                <Button
                  size="sm"
                  variant={"outline"}
                  formAction={async () => {
                    "use server";

                    await prisma.review.delete({
                      where: {
                        id: review.id,
                      },
                    });

                    revalidatePath("/");
                  }}
                >
                  <X size={16} />
                </Button>
              </form>
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <SelectStar
                  setStar={changeStar.bind(null, review.id)}
                  star={review.stars}
                />
                <span className="text-sm font-medium">{review.stars}</span>
              </div>
              <UpdateTitleForm className="font-bold text-lg">
                {review.name}
              </UpdateTitleForm>
              <CardDescription>{review.review}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="px-4">
        <ReviewForm />
      </Card>
    </PageLayout>
  );
}
