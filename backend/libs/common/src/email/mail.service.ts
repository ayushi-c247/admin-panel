import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import Handlebars from 'handlebars';
import * as path from 'path';
import { promises as fs } from 'fs';


export const AvailableTemplates = {
  OTP: 'otp',
  REGISTERED_USER: 'registration',
};

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}
  subject: string;
  body: string;
  webURL = process.env.SITE_URL;
  adminURL: any = '';
  cc: any = '';
  attachments: any = [];

  async setTemplate(templateName: any, replaceObject: any = {}) {
    switch (templateName) {
      case AvailableTemplates.OTP:
        this.subject = 'otp';
        break;
      case AvailableTemplates.REGISTERED_USER:
        this.subject = 'Registration';
        break;
      default:
        break;
    }
    const header = await fs.readFile(
      path.resolve(__dirname, '../../../', 'templates', 'header.hbs'),
      'utf8',
    );

    const footer = await fs.readFile(
      path.resolve(__dirname, '../../../', 'templates', 'footer.hbs'),
      'utf8',
    );

    const content = `${header}${await fs.readFile(
      path.resolve(__dirname, '../../../', 'templates', `${templateName}.hbs`),
      'utf8',
    )}${footer}`;

    const template = Handlebars.compile(content);
    this.body = template({
      ...replaceObject,
      webURL: this.webURL,
      adminURL: this.adminURL,
    });

    return this.body;
  }
  async setSubject(subject: any) {
    this.subject = subject;
  }
  async setBody(body: any) {
    this.body = body;
  }
  async setCC(cc: any) {
    this.cc = cc;
  }
  async sendMail(email: string) {
    if (!email) {
      throw new Error('Please provide email.');
    }
    const mailOption = {
      from: 'Admin <test.chapter247@gmail.com>',
      to: email,
      cc: this.cc,
      subject: this.subject,
      html: this.body,
      attachments: this.attachments,
    };
    return await this.mailerService
      .sendMail(mailOption)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
}
