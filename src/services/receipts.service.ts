import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";
import { ReceiptType } from "../types/receipts.types";
import { sequelize } from "../libs/sequelize";
import { CreateReceiptDto } from "../types/dto/receipts.dto";
import { Model } from "sequelize";
import { Period } from "../types/periods.type";

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

  // createInfo() {
  //   const quantity = 5;
  //   for (let i = 0; i < quantity; i++) {
  //     const letter = i % 2 === 0 ? "A" : "B";
  //     const firstName = faker.person.firstName();
  //     const lastName = faker.person.lastName();
  //     const expenses = [
  //       {
  //         description:
  //           "Previsión bono alimenticio trabajador residencial según decreto",
  //         amount: 1000,
  //       },
  //       {
  //         description: "CANTV Conserjería",
  //         amount: 1260.34,
  //       },
  //       {
  //         description: "Hidrocapitalito junio",
  //         amount: 2116.32,
  //       },
  //     ];
  //     const date = faker.date.anytime();
  //     const debt = i % 2 === 0 ? faker.number.float({min: 100, max: 600}) : undefined;

  //     this.receipts.push({
  //       receiptId: i + 1,
  //       emision: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
  //       property: letter + faker.number.int({ min: 1, max: 12 }),
  //       owner: `${firstName} ${lastName}`,
  //       billedMonth: faker.date.month(),
  //       year: 2023,
  //       aliquot: 3.7643,
  //       owedAmount:
  //         (expenses
  //           .map((item) => item.amount)
  //           .reduce((prev, curr) => prev + curr, 0) *
  //           1.2 *
  //           3.7643) /
  //         100 + (debt ? debt * 2 : 0),
  //       expenses: expenses,
  //       debt: debt,
  //       penalty: debt ? debt : 0,
  //     });
  //   }
  // }

  async findAll(apartmentId: number) {    
    const receiptList: Model<ReceiptType>[] = await sequelize.models.Receipt.findAll({
      where: {
        apartmentId: apartmentId
      },
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
      month: monthsArray[receipt.dataValues.period.month],
      year: receipt.dataValues.period.year,
    }));
    
    return formattedReceiptList;
  }

  async findOneAsAdmin(id: number) {
    const receipt: Model<ReceiptType> | null = await sequelize.models.Receipt.findByPk(id, {
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

    if (receipt) {
      return receipt;      
    } else {
      throw boom.notFound("Id is incorrect");
    }
  }

  async findOne(id: number, apartmentId: number) {
    const receipt: Model<ReceiptType> | null = await sequelize.models.Receipt.findByPk(id, {
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

    if (receipt) {
      if(receipt.dataValues.apartmentId === apartmentId){
        return receipt;
      } else {
        throw boom.unauthorized("Token does not belong to this apartment")
      }
    } else {
      throw boom.notFound("Id is incorrect");
    }
  }

  async create(data: CreateReceiptDto) {
    try {
      const newReceipt = await sequelize.models.Receipt.create(data as any);
      
      return newReceipt;
    } catch (error) {
      throw error;
    }
  }
  
  async updateAsAdmin(id:number, data: CreateReceiptDto) {
    try {
      const receipt = await this.findOneAsAdmin(id);
      const updatedReceipt = await receipt.update(data);

      return updatedReceipt;
    } catch (error) {
      throw error;
    }
  }
  
  async update(id:number, data: CreateReceiptDto, apartmentId: number) {
    try {
      const receipt = await this.findOne(id, apartmentId);
      const updatedReceipt = await receipt.update(data);

      return updatedReceipt;
    } catch (error) {
      throw error;
    }
  }

  async deleteAsAdmin(id: number) {
    try {
      const receipt = await this.findOneAsAdmin(id);
      receipt.destroy();
      return id;
      
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number, apartmentId: number) {
    try {
      const receipt = await this.findOne(id, apartmentId);
      receipt.destroy();
      return id;
      
    } catch (error) {
      throw error;
    }
  }
}

export { ReceiptsService };
