export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  role?: string;
  company: {
    department: string;
  };
}