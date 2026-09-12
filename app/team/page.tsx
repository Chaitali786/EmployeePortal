"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Employee } from "@/types/employee";
import { getEmployeeById } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function TeamPage() {
  const { user, toggleStarColleague } = useAuth();
  const [teamMembers, setTeamMembers] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.savedColleagueIds.length === 0) {
      setTeamMembers([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    
    Promise.all(user.savedColleagueIds.map((id) => getEmployeeById(id)))
      .then((employees) => {
        setTeamMembers(employees);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.savedColleagueIds]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <p className="text-red-400 text-sm">
          Please log in to view your team members.
        </p>
        <Link href="/login" className="text-cyan-400 text-xs underline">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-white">My Saved Team</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Key colleagues and contacts saved for direct project collaboration.
          </p>
        </div>
        <span className="self-start sm:self-auto text-xs px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
          {teamMembers.length} Saved {teamMembers.length === 1 ? "Member" : "Members"}
        </span>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading your team...</p>
      ) : teamMembers.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center space-y-3">
          <p className="text-slate-400 text-sm">
            You have not added any colleagues to your team yet.
          </p>
          <Link
            href="/departments"
            className="inline-block px-4 py-2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition"
          >
            Browse Departments
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teamMembers.map((emp) => (
            <div
              key={emp.id}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-start gap-3">
                <img
                  src={emp.image}
                  alt={`${emp.firstName} ${emp.lastName}`}
                  className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/employees/${emp.id}`}
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition truncate block"
                  >
                    {emp.firstName} {emp.lastName}
                  </Link>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {emp.company?.title || emp.email}
                  </p>
                  <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                    {emp.company?.department}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <Link
                  href={`/employees/${emp.id}`}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  View Profile &rarr;
                </Link>
                <button
                  onClick={() => toggleStarColleague(emp.id)}
                  className="text-xs px-2.5 py-1 rounded bg-red-950 border border-red-800 text-red-300 hover:bg-red-900 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}