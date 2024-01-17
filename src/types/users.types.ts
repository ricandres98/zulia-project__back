interface User {
  id: number;
  email: string;
  password?: string;
  role: "admin" | "user";
  apartmentId: number;
}

export { User };