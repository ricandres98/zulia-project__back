import { Owner } from "./owners.type";

interface Apartment {
	id: number;
	apartmentNumber: string;
	aliquot: number;
	createdAt: string;
	ownerId: number;
	debt?: number;
	owner: Owner
}

export { Apartment };