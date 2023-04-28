import { Component, OnInit } from '@angular/core';
import { IonicPickComponent } from '../../components/ionic-pick/ionic-pick.module';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'basic',
  templateUrl: './basic.page.html',
  styleUrls: ['./basic.page.scss'],
})
export class BasicPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  portChange(event: {
    component: IonicPickComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
}
