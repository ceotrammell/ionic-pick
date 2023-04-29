import { Observable } from 'rxjs';
import { ICountry } from './country.interface';
import { IPort } from './port.interface';
import { HttpClient } from '@angular/common/http';

let httpClient: HttpClient;

export class Country implements ICountry {
  id: number;
  name: string;
  flag?: string;
  ports?: IPort[];
  get flagUrl(): string {
    var img = new Image();
    img.src = `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${this.flag}.svg`;
    return img.src;
  }

  constructor(country: ICountry) {
    this.id = country.id;
    this.name = country.name;
    this.flag = country.flag;
    this.ports = country.ports;
  }
}
