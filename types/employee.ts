export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company?: {
    name?: string;
    department?: string;
    title?: string;
  };
  address?: {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
}