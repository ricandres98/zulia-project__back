import { Period } from "../periods.type";

interface CreatePeriodDto extends Omit<Period, "id" | "createdAt"> {}

interface updatePeriodDto extends Partial<CreatePeriodDto>{}

export { CreatePeriodDto, updatePeriodDto };