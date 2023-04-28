import { Component, OnInit } from '@angular/core';
import { IonicPickComponent } from '../../components/ionic-pick/ionic-pick.module';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'should-store-item-value',
  templateUrl: './should-store-item-value.page.html',
  styleUrls: ['./should-store-item-value.page.scss']
})
export class ShouldStoreItemValuePage implements OnInit {
  ports: Port[];
  portId: number;
  portIds: number[];

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
