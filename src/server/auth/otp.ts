export type OtpChallenge = {
  challengeId: string;
  expiresAt: Date;
};

export interface OtpProvider {
  requestCode(phone: string): Promise<OtpChallenge>;
  verifyCode(challengeId: string, code: string): Promise<boolean>;
}

export class OtpProviderNotConfiguredError extends Error {
  constructor() {
    super("OTP provider is not configured. Add a real OTP provider before enabling authentication.");
    this.name = "OtpProviderNotConfiguredError";
  }
}

export class UnconfiguredOtpProvider implements OtpProvider {
  requestCode(): Promise<OtpChallenge> {
    throw new OtpProviderNotConfiguredError();
  }

  verifyCode(): Promise<boolean> {
    throw new OtpProviderNotConfiguredError();
  }
}