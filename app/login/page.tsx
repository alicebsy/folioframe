import { getCurrentUser } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");
  return <LoginForm />;
}
