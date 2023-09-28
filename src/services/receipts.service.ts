import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";
import { ReceiptType } from "../types/receipts.types";

interface ReceiptsService {
  receipts: ReceiptType[];
}

class ReceiptsService {
  constructor() {
    this.receipts = [];
    this.createInfo();
  }

  createInfo() {
    const quantity = 5;
    for (let i = 0; i < quantity; i++) {
      const letter = i % 2 === 0 ? "A" : "B";
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const expenses = [
        {
          description:
            "Previsión bono alimenticio trabajador residencial según decreto",
          amount: 1000,
        },
        {
          description: "CANTV Conserjería",
          amount: 1260.34,
        },
        {
          description: "Hidrocapitalito junio",
          amount: 2116.32,
        },
      ];
      const date = faker.date.anytime();
      const debt = i % 2 === 0 ? faker.number.float({min: 100, max: 600}) : undefined;

      this.receipts.push({
        receiptId: i + 1,
        emision: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        property: letter + faker.number.int({ min: 1, max: 12 }),
        owner: `${firstName} ${lastName}`,
        billedMonth: faker.date.month(),
        year: 2023,
        aliquot: 3.7643,
        owedAmount:
          (expenses
            .map((item) => item.amount)
            .reduce((prev, curr) => prev + curr, 0) *
            1.2 *
            3.7643) /
          100 + (debt ? debt * 2 : 0),
        expenses: expenses,
        debt: debt,
        penalty: debt ? debt : 0,
      });
    }
  }

  findAll() {
    const receiptList = this.receipts.map((receipt) => ({
      id: receipt.receiptId,
      date: receipt.emision,
      month: receipt.billedMonth,
      year: receipt.year,
    }));

    return receiptList;
  }

  async findOne(id: number) {
    const specificReceipt = this.receipts.find(
      (receipt) => receipt.receiptId === id
    );

    if (specificReceipt) {
      return specificReceipt;
    } else {
      throw boom.notFound("Id is incorrect");
    }
  }
}

export { ReceiptsService };
