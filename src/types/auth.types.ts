export interface UserWithFields extends Express.User {
  id: number;
	email: string;
	apartmentId: number;
	role: "user" | "admin";
}
