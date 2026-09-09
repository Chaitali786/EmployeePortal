"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_USERS } from "@/data/users";

export default function DashboardPage() {
  const params = useParams();
  const username = params.username as string;

  
  const user = MOCK_USERS.find(
    (u) => u.username.toLowerCase() === username?.toLowerCase()
  );

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">
        Hello, {user ? user.name : username}!
      </h1>

      <Link href="/" className="text-blue-500 underline text-sm">
        Back to Login
      </Link>
    </div>
  );
}