import { faker } from "@faker-js/faker";
import { UserType } from "../types/users.types";
import boom from "@hapi/boom";

interface UsersService {
    users: UserType[];
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
                id: (i + 1),
                firstName: firstName,
                lastName: lastName,
                username: faker.internet.displayName({ 
                    firstName: firstName,
                    lastName: lastName
                }),
                email: faker.internet.email(),
                apartment: "A" + faker.number.int({ min: 1, max: 12}),
                residence: "Zulia"
            })
        }
    }

    findAll() {
        return this.users;
    }

    async findById(id: number) {
        const user = this.users.find(user => user.id === id);
        if(user) {
            return user;
        } else {
            throw boom.notFound('User does not exist');
        }
    }
}

export { UsersService };