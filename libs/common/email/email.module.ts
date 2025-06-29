// libs/common/email/email.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import emailConfig from './email.config';
import { join } from 'path';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule.forFeature(emailConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        // 1) leggo e assicuro che mail non sia undefined
        const mail = cfg.get<{
          host: string;
          port: number;
          user: string;
          pass: string;
          fromName: string;
          fromAddress: string;
        }>('email');

        if (!mail) {
          throw new Error('[EmailModule] missing "email" configuration');
        }

        // 2) ricompongo il campo from
        const from = `"${mail.fromName}" <${mail.fromAddress}>`;

        // 3) trasporto SMTP
        const transportOpts = {
          host: mail.host,
          port: mail.port,
          secure: mail.port === 465,
          auth: { user: mail.user, pass: mail.pass },
        };

        // 4) template dir
        const templatesDir = join(__dirname, 'templates');

        console.log('✅ SMTP settings:', transportOpts);
        console.log('📑 Template dir:', templatesDir);
        console.log('✉️  From address:', from);

        return {
          transport: transportOpts,
          defaults: { from },
          template: {
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: { strict: true },
          },
        };
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
