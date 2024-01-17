import { JwtPayload } from "jsonwebtoken";

export interface UserWithFields extends Express.User {
  id: number;
	email: string;
	apartmentId: number;
	role: "user" | "admin";
}

export interface Payload {
	sub: number;
	role: "admin" | "user";
	apt: number;
}

export interface UserFromToken extends Express.User {
	sub: number;
	role: "admin" | "user";
	apt: number;
	iat: number;
}
// { sub: 2, role: 'user', apt: 1, iat: 1705419500 }