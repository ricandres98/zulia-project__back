interface CreateApartmentType {
	apartmentNumber: string;
	aliquot: number;
	ownerId: number;
	debt: number;
}

interface UpdateApartmentType {
	apartmentNumber?: string;
	aliquot?: number;
	ownerId?: number;
	debt?: number;
}

export { CreateApartmentType, UpdateApartmentType };