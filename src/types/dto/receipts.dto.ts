import { ReceiptType } from "../receipts.types";

export type CreateReceiptDto = Omit<ReceiptType, "id" | "createdAt" | "period">;
