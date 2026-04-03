import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'elapsed',
  standalone: true,
})
export class ElapsedPipe implements PipeTransform {

  private dateTimeFormat: Intl.DateTimeFormat;

  constructor() {
    this.dateTimeFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  transform(value?: string): string {
    if (!value) return "";

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}hours ago`;
    const days = Math.floor(hours / 24);
    if (days <= 7) {
      return `${days} days ago`
    } else {
      return this.dateTimeFormat.format(date);
    }
  }

}
