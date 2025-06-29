Questo file spiega come configurare e utilizzare il modulo email all'interno del tuo progetto.

1. Installazione dipendenze

Esegui questi comandi nella root del tuo progetto:

npm install @nestjs-modules/mailer nodemailer handlebars

2. Configurazione .env

Nel file .env alla radice del monorepo, aggiungi:

SMTP_HOST=smtp.il-tuo-provider.com
SMTP_PORT=587
SMTP_USER=tuo_username
SMTP_PASS=tuo_password
SMTP_FROM="MyApp" <no-reply@myapp.com>

3. Import del modulo in NestJS

Nel AppModule (o in qualunque modulo di un microservizio):

import { EmailModule } from '@common/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    /* altri moduli */
  ],
})
export class AppModule {}

4. Uso del servizio per inviare email

Nel tuo controller o service:

constructor(private readonly emailService: EmailService) {}

await this.emailService.sendMail({
  to: 'destinatario@esempio.com',
  subject: 'Oggetto della mail',
  text: 'Testo in plain-text',         // opzionale
  template: 'welcome',                  // nome file in /templates (opzionale)
  context: { name: 'Mario', appUrl: 'https://myapp.local' },
  cc: ['cc1@esempio.com'],             // opzionale
  bcc: ['bcc@esempio.com'],            // opzionale
  attachments: [                        // opzionale
    { filename: 'file.txt', path: './files/file.txt' }
  ],
});

5. Posizionamento dei template

Metti i tuoi file .hbs in:

/libs/common/email/templates/

(es.: welcome.hbs, invoice.hbs, ecc.)

6. Compatibilità Windows + PowerShell

Usa Remove-Item .\\dist -Recurse -Force per pulire la build.

Avvia il server in dev: npm run start:dev da PowerShell.

Windows gestisce percorsi con backslash, ma path.join(__dirname, ...) nel controller calcola l'assoluto correttamente.