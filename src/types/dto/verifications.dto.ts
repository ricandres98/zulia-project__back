import { VerificationTuple } from "../verifications.types";

interface VerifyEmailDto extends Pick<VerificationTuple, "email"> {}

export { VerifyEmailDto };