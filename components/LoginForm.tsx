
"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_USERS } from "@/data/users";
const LoginForm = () => {
 
   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const matchedUser = MOCK_USERS.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password
  );

  return (
    <div className="w-full max-w-sm p-8 rounded-2xl bg-blue-800 backdrop-blur-md border border-white space-y-6">
     
      <div className="text-center space-y-1">
        
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Employee Portal
        </h1>
        <p className="text-xs text-white">
          Sign in to access your workspace
        </p>
      </div>

    
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300 ml-1">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-amber-50  text-sm "
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300 ml-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-amber-50  text-sm "
          />
        </div>

        <div className="pt-2">
          {matchedUser ? (
            <Link
              href={`/dashboard/${matchedUser.username}`}
              className="block w-full py-2.5 px-4 rounded-lg bg-blue-950 text-white font-semibold text-center text-sm  "
            >
              Sign In as {matchedUser.name} 
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="block w-full py-2.5 px-4 rounded-lg bg-blue-950 text-white font-semibold text-center text-sm  "
            >
              Enter Valid Credentials
            </button>
          )}
        </div>
      </div>

      
    </div>
  );
  
}

export default LoginForm