"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Employee } from "@/types/employee";
import { getEmployeeById } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { user, toggleStarColleague } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getEmployeeById(id)
      .then((data) => setEmployee(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-slate-400 text-sm py-8">Loading employee profile...</p>;
  }

  if (!employee) {
    return (
      <div className="space-y-4 py-8">
        <p className="text-red-400 text-sm">Employee not found.</p>
        <Link href="/departments" className="text-cyan-400 text-sm underline">
          &larr; Back to Departments
        </Link>
      </div>
    );
  }

  const isStarred = user?.savedColleagueIds.includes(employee.id);

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <Link
        href={`/departments/${encodeURIComponent(employee.company?.department || "")}`}
        className="text-xs text-cyan-400 hover:underline inline-block"
      >
        &larr; Back to {employee.company?.department || "Department"}
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-sm text-slate-300 mt-0.5">{employee.company?.title}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-800 text-cyan-300">
                {employee.company?.department}
              </span>
            </div>
          </div>

          {user && (
            <button
              onClick={() => toggleStarColleague(employee.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition ${
                isStarred
                  ? "bg-amber-950 border-amber-800 text-amber-300 hover:bg-amber-900"
                  : "bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-500"
              }`}
            >
              {isStarred ? " In My Team" : "Add to My Team"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800 text-xs">
  <div>
    <span className="text-slate-400 block uppercase tracking-wider">Email</span>
    <span className="text-white font-medium text-sm mt-0.5 block">{employee.email}</span>
  </div>
  <div>
    <span className="text-slate-400 block uppercase tracking-wider">Phone</span>
    <span className="text-white font-medium text-sm mt-0.5 block">{employee.phone}</span>
  </div>
  <div>
    <span className="text-slate-400 block uppercase tracking-wider">Office City</span>
    <span className="text-white font-medium text-sm mt-0.5 block">{employee.address?.city || "N/A"}</span>
  </div>
  <div>
    <span className="text-slate-400 block uppercase tracking-wider">Company</span>
    <span className="text-white font-medium text-sm mt-0.5 block">{employee.company?.name || "N/A"}</span>
  </div>
</div>
      </div>
    </div>
  );
}