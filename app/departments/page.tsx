"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllEmployees } from "@/services/api";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEmployees()
      .then((employees) => {
        const uniqueDepts = Array.from(
          new Set(
            employees
              .map((emp) => emp.company?.department)
              .filter((dept): dept is string => Boolean(dept))
          )
        );
        setDepartments(uniqueDepts);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 py-6">
      <h1 className="text-2xl font-bold text-white">Departments</h1>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading departments...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <Link
              key={dept}
              href={`/departments/${encodeURIComponent(dept)}`}
              className="bg-slate-900 border border-slate-800 p-4 rounded-lg hover:border-cyan-500 transition block"
            >
              <h2 className="text-base font-medium text-white">{dept}</h2>
              <span className="text-xs text-slate-400 mt-2 block">
                View colleagues &rarr;
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}