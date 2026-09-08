"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_USERS } from "@/data/users";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  const matchedUser = MOCK_USERS.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password
  );

  return (
   
    <div className="flex flex-col items-center  justify-center min-h-screen gap-4 border  ">
      <div className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        
        {matchedUser ? (
          <Link
            href={`/dashboard/${matchedUser.username}`}
            className="bg-blue-600  p-2 rounded text-center font-medium"
          >
            Login
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="bg-gray-300 text-gray-500 p-2 rounded cursor-not-allowed"
          >
            Enter Valid Credentials
          </button>
        )}
      </div>
    </div>
  );
}