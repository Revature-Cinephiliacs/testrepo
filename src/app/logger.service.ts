import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(subject: string, info: any) {
    console.log("", new Date() + ": " + subject + " - " + info);
  }

  error(subject: string, info: any) {
    console.error(new Date() + ": " + subject + " - " + info);
  }
}
