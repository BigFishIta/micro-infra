// services/template-service/src/test-email.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from '@common/email/email.service';

@Controller('test-email')
export class TestEmailController {
  constructor(private readonly emailService: EmailService) {}

  /** 
   * GET /test-email/send-with-cc
   * - to=<destinatario>
   * - cc=<indirizzo cc,puoi separarne più di uno con la virgola>
   * - bcc=<indirizzo bcc> 
   * (non gestiamo attachments via query perché servono file, li mettiamo in codice)
   */
  @Get('send-with-cc')
  async sendWithCc(
    @Query('to') to: string,
    @Query('cc') cc?: string,
    @Query('bcc') bcc?: string,
  ) {
    return this.emailService.sendMail({
      to,
      subject: 'Email con CC e BCC',
      text: 'Questa email ha cc e bcc!',
      // splitto la stringa in array se c’è più di un indirizzo
      cc: cc ? cc.split(',') : undefined,
      bcc: bcc ? bcc.split(',') : undefined,
    });
  }

  /**
   * GET /test-email/send-with-attachment
   * - to=<destinatario>
   * Questo endpoint allega un file fisico che mettiamo nella cartella `files/`
   */
  @Get('send-with-attachment')
  async sendWithAttachment(
    @Query('to') to: string,
  ) {
    return this.emailService.sendMail({
      to,
      subject: 'Report mensile',
      text: 'Ciao, in allegato trovi il report PDF.',
      attachments: [
        {
          filename: 'report.pdf',
          // metti un PDF di prova in <repo>/services/template-service/files/report.pdf
          path: './services/template-service/files/report.pdf',
        },
      ],
    });
  }
}
