// libs/common/email/email.service.ts

import { Injectable } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface EmailAttachment {
  filename: string;
  path?: string;         // percorso sul filesystem
  content?: string|Buffer; // oppure contenuto diretto
  contentType?: string;
}

@Injectable()
export class EmailService {
  private plainTransporter: nodemailer.Transporter;

  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {
    const mailCfg = this.config.get('email');
    this.plainTransporter = nodemailer.createTransport({
      host: mailCfg.host,
      port: mailCfg.port,
      secure: mailCfg.port === 465,
      auth: { user: mailCfg.user, pass: mailCfg.pass },
    });
  }

  async sendMail(params: {
    to: string | string[];
    subject: string;
    text?: string;
    template?: string;
    context?: any;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: EmailAttachment[];
  }): Promise<any> {
    // Base fields validi per entrambi i flussi
    const base: ISendMailOptions = {
      to: params.to,
      subject: params.subject,
      cc: params.cc,
      bcc: params.bcc,
      attachments: params.attachments as any,  // ISendMailOptions supporta attachments
    };

    if (params.template && params.template.trim()) {
      // → routing via MailerService + Handlebars
      const opts: ISendMailOptions = {
        ...base,
        template: params.template,
        context: params.context,
      };
      console.log('✉️ [EmailService] template send:', opts);
      return this.mailer.sendMail(opts);
    } else {
      // → plain-text diretto via transporter nodemailer
      const plainOpts: nodemailer.SendMailOptions = {
        ...base,
        text: params.text,
      };
      console.log('✉️ [EmailService] plain-text send:', plainOpts);
      return this.plainTransporter.sendMail(plainOpts);
    }
  }
}
