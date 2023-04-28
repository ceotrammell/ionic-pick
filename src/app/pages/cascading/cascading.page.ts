import { Component, OnInit } from '@angular/core';
import { IonicPickComponent } from '../../components/ionic-pick/ionic-pick.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';

@Component({
  selector: 'cascading',
  templateUrl: './cascading.page.html',
  styleUrls: ['./cascading.page.scss']
})
export class CascadingPage implements OnInit {
  ports: Port[];
  countries: Country[];
  country: Country;
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.countries = this.portService.getCountries();
  }

  countryChange(event: {
    component: IonicPickComponent,
    value: Country
  }) {
    if (event.value) {
      this.ports = this.portService.getPorts().filter(port => {
        return port.country.id === event.value.id;
      });
    } else {
      this.ports = [];
      this.port = null;
    }
  }
}
