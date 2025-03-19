import { VerificationTuple } from "../verifications.types";

interface VerifyEmailDto extends Pick<VerificationTuple, "email"> {}

interface VerifyCodeDto extends Pick<VerificationTuple, "email" | "code"> {}

export { VerifyEmailDto, VerifyCodeDto };