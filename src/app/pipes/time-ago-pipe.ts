import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string) {
    const now = new Date();
    const past = new Date(value);
    
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 60) { return `há ${diff} segundo${diff !== 1 ? 's' : ''}`; }
    if (diff < 3600) { return `há ${Math.floor(diff / 60)} minuto${Math.floor(diff / 60) !== 1 ? 's' : ''}`; }
    if (diff < 86400) { return `há ${Math.floor(diff / 3600)} hora${Math.floor(diff / 3600) !== 1 ? 's' : ''}`; }
    if (diff < 2592000) { return `há ${Math.floor(diff / 86400)} dia${Math.floor(diff / 86400) !== 1 ? 's' : ''}`; }
    if (diff < 31536000) { return `há ${Math.floor(diff / 2592000)} mês${Math.floor(diff / 2592000) !== 1 ? 'es' : ''}`; }
    return `há ${Math.floor(diff / 31536000)} ano${Math.floor(diff / 31536000) !== 1 ? 's' : ''}`;
  }

}
