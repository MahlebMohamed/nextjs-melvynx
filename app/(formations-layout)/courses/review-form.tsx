"use client";

import { addReviewSafeAction } from "@/actions/review-form-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

export default function ReviewForm() {
  // const [state, formAction] = useActionState(addReviewAction, {});
  const {
    execute,
    hasErrored,
    result,
    //  hasSucceeded
  } = useAction(addReviewSafeAction);

  return (
    <form
      className="flex flex-col gap-4"
      action={async (formData) => {
        const name = formData.get("name") as string;
        const review = formData.get("review") as string;

        await execute({ name, review });
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" name="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="review">Review</Label>
        <Textarea id="review" name="review" />
      </div>
      <SubmitButton type="submit" className="cursor-pointer">
        Submit
      </SubmitButton>
      {hasErrored && (
        <p className="text-red-500">
          {result.serverError ||
            result.validationErrors?.name?._errors?.[0] ||
            result.validationErrors?.review?._errors?.[0] ||
            "An error occurred"}
        </p>
      )}
      {/* {hasSucceeded && <p className="text-green-500">Success</p>} */}
      {/* {state.error ? <p className="text-red-500">{state.error}</p> : null}
      {state.message ? <p className="text-green-500">{state.message}</p> : null} */}
    </form>
  );
}

function SubmitButton(props: ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return <Button {...props} disabled={props.disabled || pending} />;
}
