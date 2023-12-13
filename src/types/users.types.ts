interface CreateUserType {
  email: string,
  password: string,
  apartmentId: string,
}

interface UpdateUserType {
	password: string
}

export { CreateUserType, UpdateUserType };