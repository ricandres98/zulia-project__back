import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";

interface userCredentials {
  username: string;
  password: string;
}

interface token extends userCredentials {
	token: string;
}

interface AuthenticationService {
  users: userCredentials[];
	tokens: token[]
}

class AuthenticationService {
  constructor() {
    this.users = [
      {
        username: "ricardo",
        password: "1234",
      },
      {
				username: "Savannah",
				password: "root"
			},
    ];
		this.tokens = [];
  }

	async getToken(username: string, password: string) {
    const userIndex = this.users.findIndex(
      (user) => user.username === username
    );
		if(userIndex != -1) {
			const areValidCredentials = this.users[userIndex].password === password;
			if(areValidCredentials) {
				const token = faker.string.nanoid(10);
				this.tokens.push({
					username,
					password,
					token
				});

				return token
			}
			throw boom.unauthorized("Wrong password");
		}
		throw boom.unauthorized("User doesn't exist");
  }
}

export { AuthenticationService };