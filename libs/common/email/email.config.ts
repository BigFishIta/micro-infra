// libs/common/email/email.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  host: process.env.SMTP_HOST ?? 'localhost',
  port: parseInt(process.env.SMTP_PORT ?? '587', 10),
  user: process.env.SMTP_USER ?? '',
  pass: process.env.SMTP_PASS ?? '',
  fromName: process.env.SMTP_FROM_NAME,
  fromAddress: process.env.SMTP_FROM_ADDRESS,
}));

