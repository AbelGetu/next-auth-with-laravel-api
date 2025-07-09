"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function ClientComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session?.user) return <div>Not authenticated</div>;

  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold">User Information</h2>
        <div className="mt-2 space-y-2">
          <p>Name: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
          <p>Roles: {session.user.roleNames?.join(", ")}</p>
        </div>
      </div>
      <Button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        variant="destructive"
      >
        Sign Out
      </Button>
    </div>
  );
}