interface CreateUserType {
  email: string,
  password: string,
  apartmentId: string,
  role: "user" | "admin",
}

interface UpdateUserType {
	password: string
}

export { CreateUserType, UpdateUserType };