interface CreateOwnerType {
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  personId: number;
}

interface UpdateOwnerType {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  secondLastName?: string;
  personId?: number;
}

export { CreateOwnerType, UpdateOwnerType };