import { authOptions } from "@/lib/auth/auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { useAuth } from "@/features/auth/hooks/use-auth";
import { ClientComponent } from "./client-component";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
      <ClientComponent />
    </div>
  );
}