"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); 

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  
  const isLoginPage = pathname === "/login";

  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-xs">
            SG
          </div>
          <span className="text-white font-bold text-base tracking-wide">
            SaffronGig
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/departments"
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Departments
          </Link>
          {user && (
            <Link
              href="/team"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              My Team ({user.savedColleagueIds.length})
            </Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 hidden sm:inline">
              {user.name} ({user.department})
            </span>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-lg bg-red-950 border border-red-800 text-red-300 hover:bg-red-700 hover:text-white transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          
          !isLoginPage && (
            <Link
              href="/login"
              className="text-xs px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition"
            >
              Login
            </Link>
          )
        )}
      </div>
    </header>
  );
}