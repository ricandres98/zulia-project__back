import { Owner } from "../owners.type";

interface CreateOwnerDto extends Omit<Owner, "id" | "createdAt"> {}

interface UpdateOwnerDto extends Partial<Omit<Owner, "id" | "createdAt">> {}

export { CreateOwnerDto, UpdateOwnerDto };