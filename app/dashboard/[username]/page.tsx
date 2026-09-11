"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Employee } from "@/types/employee";
import { getEmployeesByDepartment } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  const [departmentStaff, setDepartmentStaff] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    getEmployeesByDepartment(user.department)
      .then((staff) => {
        setDepartmentStaff(staff);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-red-400 font-semibold">
          You must be logged in to view your dashboard.
        </p>
        <Link href="/login" className="text-cyan-400 underline text-sm">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      {/* Welcome Card - Solid Slate 900 */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome, {user.name}!
            </h1>
            <p className="text-sm text-slate-300 mt-1">{user.role}</p>
          </div>
          <span className="self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-700 text-cyan-300">
            {user.department}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block uppercase tracking-wider">
              Office Location
            </span>
            <span className="text-white font-medium text-sm mt-0.5 block">
              {user.officeLocation}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase tracking-wider">
              Assigned Client
            </span>
            <span className="text-white font-medium text-sm mt-0.5 block">
              {user.clientName}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase tracking-wider">
              Joining Date
            </span>
            <span className="text-white font-medium text-sm mt-0.5 block">
              {user.joiningDate}
            </span>
          </div>
        </div>
      </div>

      {/* Staff Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white tracking-wide">
            Colleagues in {user.department} ({departmentStaff.length})
          </h2>
        </div>

        {loading ? (
          <p className="text-slate-400 text-sm">
            Loading department colleagues from API...
          </p>
        ) : departmentStaff.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No colleagues found in this department.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {departmentStaff.map((emp) => (
              <div
                key={emp.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-cyan-500 transition"
              >
                <img
                  src={emp.image}
                  alt={`${emp.firstName} ${emp.lastName}`}
                  className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {emp.firstName} {emp.lastName}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">{emp.email}</p>
                  <span className="inline-block mt-1 text-[11px] text-cyan-400">
                    {emp.phone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}