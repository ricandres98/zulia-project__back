import { Apartment } from "../apartments.type";

interface CreateApartmentDto extends Omit<Apartment, "id" | "owner" | "createdAt" > {}

interface UpdateApartmentDto extends Partial<CreateApartmentDto> {}

export { CreateApartmentDto, UpdateApartmentDto };