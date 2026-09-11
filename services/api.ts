import { Employee } from "@/types/employee";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";


export async function getAllEmployees(): Promise<Employee[]> {
  const res = await fetch(`${BASE_URL}/users?limit=100`);
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.statusText}`);
  }
  const data = await res.json();
  return data.users || [];
}


export async function getEmployeesByDepartment(department: string): Promise<Employee[]> {
  const allEmployees = await getAllEmployees();
  return allEmployees.filter(
    (emp) =>
      emp.company?.department.toLowerCase() === department.toLowerCase()
  );
}


export async function getEmployeeById(id: number | string): Promise<Employee> {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch employee with ID ${id}`);
  }
  return res.json();
}