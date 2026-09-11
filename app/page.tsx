"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllEmployees } from "@/services/api";
import { Employee } from "@/types/employee";

export default function HomePage() {
  const [featured, setFeatured] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEmployees()
      .then((employees) => {
       
        const randomemp = [...employees].sort(() => 0.5 - Math.random());
        setFeatured(randomemp.slice(0, 4));

       
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
        console.error("Failed to load home data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10 py-6">
     
      <section className="text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          SaffronGig Directory
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
          Connect with team members across divisions, explore offices, and coordinate on project deliveries.
        </p>

       
        <div className="pt-2">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-3">
            Company Divisions
          </span>

          {loading ? (
            <p className="text-slate-500 text-xs">Loading departments...</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {departments.map((dept) => (
                <Link
                  key={dept}
                  href={`/departments/${encodeURIComponent(dept)}`}
                  className="px-3 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 hover:border-cyan-500 transition"
                >
                  {dept}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

     
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-wide">
          Featured Colleagues
        </h2>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading colleagues...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((emp) => (
              <div
                key={emp.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center flex flex-col items-center justify-between space-y-3 hover:border-slate-700 transition"
              >
                <img
                  src={emp.image}
                  alt={`${emp.firstName} ${emp.lastName}`}
                  className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-sm text-white">
                    {emp.firstName} {emp.lastName}
                  </h3>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] bg-cyan-950 border border-cyan-800 text-cyan-300">
                    {emp.company?.department}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate w-full">
                  {emp.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}