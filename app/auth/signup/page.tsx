import { PageLayout } from "@/components/layout-components";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
  return (
    <PageLayout>
      <Card className="mt-10">
        <CardHeader>Sign Up</CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
