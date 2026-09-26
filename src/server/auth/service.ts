import { z } from "zod";
import type { OtpProvider } from "./otp";

const phoneSchema = z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number");
const codeSchema = z.string().regex(/^\d{4,8}$/, "Invalid OTP code");

export class AuthService {
  constructor(private readonly otpProvider: OtpProvider) {}

  requestOtp(phone: string) {
    return this.otpProvider.requestCode(phoneSchema.parse(phone));
  }

  verifyOtp(challengeId: string, code: string) {
    return this.otpProvider.verifyCode(challengeId, codeSchema.parse(code));
  }
}