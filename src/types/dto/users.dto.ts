import { User } from "../users.types";

interface CreateUserDto extends Omit<User, "id" > {}

interface UpdateUserDto extends Pick<User, "password"> {}

interface ReadUserDto extends Omit<User, "password"> {}

export { CreateUserDto, UpdateUserDto, ReadUserDto };