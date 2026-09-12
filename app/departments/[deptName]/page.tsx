"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Employee } from "@/types/employee";
import { getEmployeesByDepartment } from "@/services/api";

export default function DepartmentDetailPage() {
  const params = useParams();
  const rawDept = params.deptName as string;
  const deptName = rawDept ? decodeURIComponent(rawDept) : "";

  const [colleagues, setColleagues] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptName) return;

    setLoading(true);
    getEmployeesByDepartment(deptName)
      .then((data) => {
        setColleagues(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [deptName]);

  return (
    <div className="space-y-8 py-6">
      <div className="space-y-2">
        <Link
          href="/departments"
          className="text-xs text-cyan-400 hover:underline inline-block"
        >
          &larr; Back to all departments
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {deptName}
        </h1>
        <p className="text-slate-400 text-sm">
          Colleagues currently working in this department.
        </p>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading colleagues...</p>
      ) : colleagues.length === 0 ? (
        <p className="text-slate-400 text-sm">
          No colleagues found for this department.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {colleagues.map((emp) => (
            <Link
              key={emp.id}
              href={`/employees/${emp.id}`}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-cyan-500 transition group"
            >
              <img
                src={emp.image}
                alt={`${emp.firstName} ${emp.lastName}`}
                className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 truncate">
                  {emp.firstName} {emp.lastName}
                </h3>
                <p className="text-xs text-slate-400 truncate">{emp.email}</p>
                <span className="inline-block mt-1 text-[11px] text-cyan-400">
                  {emp.phone}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}