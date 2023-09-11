import { faker } from "@faker-js/faker";
import { UserType, UserTypeWithId } from "../types/users.types";
import boom from "@hapi/boom";

interface UsersService {
  users: UserTypeWithId[];
}

class UsersService {
  constructor() {
    this.users = [];
    this.createInfo();
  }

  createInfo() {
    const amount = 5;
    for (let i = 0; i < amount; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      this.users.push({
        id: i + 1,
        firstName: firstName,
        lastName: lastName,
        username: faker.internet.displayName({
          firstName: firstName,
          lastName: lastName,
        }),
        email: faker.internet.email(),
        apartment: "A" + faker.number.int({ min: 1, max: 12 }),
        residence: "Zulia",
      });
    }
  }

  findAll() {
    return this.users;
  }

  async findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw boom.notFound("User does not exist");
    }
  }

  async updateById(
    id: number,
    body: { firstName?: string; lastName?: string }
  ) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex != -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...body,
      };

      return this.users[userIndex];
    } else {
      throw boom.notFound("User does not exist");
    }
  }

  async createNewUser(info: UserType) {
    const newUser = {
      id: this.users.length + 1,
      ...info,
    };

    const usernameTaken = !!this.users.find(
      (user) => user.username === newUser.username
    );
    const emailTaken = !!this.users.find(
      (user) => user.email === newUser.email
    );

    const userAlreadyexist = usernameTaken || emailTaken;

    if (userAlreadyexist) {
      throw boom.conflict(
        usernameTaken
          ? "That username is already on our system"
          : "That email is already on our system"
      );
    } else {
      this.users.push(newUser);
      return newUser;
    }
  }
}

export { UsersService };
