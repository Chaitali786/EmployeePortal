"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MOCK_USERS } from "@/data/users";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    
    const success = login(username, password);

    if (success) {
      
      const matched = MOCK_USERS.find(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase()
      );
      router.push(`/dashboard/${matched?.username}`);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSignIn} className="w-full max-w-sm p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/15 shadow-2xl space-y-4">
      <div className="text-center space-y-1 mb-4">
        <h1 className="text-2xl font-bold text-white">Employee Portal</h1>
        <p className="text-xs text-slate-300">Sign in to access your workspace</p>
      </div>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400"
        required
      />

      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

      <button
        type="submit"
        className="self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 border border-cyan-400/40 text-cyan-300"
      >
        Log In 
      </button>
    </form>
  );
}