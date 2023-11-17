import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";
import { CreateReceiptType, ReceiptType } from "../types/receipts.types";
import { sequelize } from "../libs/sequelize";

interface ReceiptsService {
  receipts: ReceiptType[];
}

const monthsArray = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

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

  async findAll() {
    // const receiptList = this.receipts.map((receipt) => ({
    //   id: receipt.receiptId,
    //   date: receipt.emision,
    //   month: receipt.billedMonth,
    //   year: receipt.year,
    // }));

    
    const receiptList = await sequelize.models.Receipt.findAll({
      include: [
        {
          model: sequelize.models.Period,
          as: "period"
        }
      ]
    });

    const formattedReceiptList = receiptList.map((receipt) => ({
      id: receipt.dataValues.id,
      date: receipt.dataValues.createdAt,
      month: monthsArray[receipt.dataValues.period.dataValues.month],
      year: receipt.dataValues.period.dataValues.year,
    }));
    
    return formattedReceiptList;
  }

  async findOne(id: number) {
    
    // {
    //   "receiptId": 1,
    //   "emision": "1/6/2023",
    //   "property": "A5",
    //   "owner": "Allison Fisher",
    //   "billedMonth": "August",
    //   "year": 2023,
    //   "aliquot": 3.7643,
    //   "owedAmount": 725.0406892974132,
    //   "expenses": [
    //     {
    //       "description": "Previsión bono alimenticio trabajador residencial según decreto",
    //       "amount": 1000
    //     },
    //     {
    //       "description": "CANTV Conserjería",
    //       "amount": 1260.34
    //     },
    //     {
    //       "description": "Hidrocapitalito junio",
    //       "amount": 2116.32
    //     }
    //   ],
    //   "debt": 263.66997722070664,
    //   "penalty": 263.66997722070664
    // }
    
    // const specificReceipt = this.receipts.find(
    //   (receipt) => receipt.receiptId === id
    // );

    const specificReceipt = await sequelize.models.Receipt.findByPk(id, {
      include: [
        {
          association: "period",
          include: ["commonExpenses"],
        },
        {
          association:"apartment",
          include: ["owner"]
        },
      ],
    });

    if (specificReceipt) {
      return specificReceipt;
    } else {
      throw boom.notFound("Id is incorrect");
    }
  }

  async create(data: CreateReceiptType) {
    try {
      const newReceipt = await sequelize.models.Receipt.create(data as any);
      
      return newReceipt;
    } catch (error) {
      throw error;
    }
  }
  
  async update(id:number, data: CreateReceiptType) {
    try {
      const receipt = await this.findOne(id);
      const updatedReceipt = await receipt.update(data);

      return updatedReceipt;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const receipt = await this.findOne(id);
      receipt.destroy();
      return id;
      
    } catch (error) {
      throw error;
    }
  }
}

export { ReceiptsService };
