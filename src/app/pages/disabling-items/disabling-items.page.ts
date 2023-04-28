import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPickComponent } from '../../components/ionic-pick/ionic-pick.module';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'disabling-items',
  templateUrl: './disabling-items.page.html',
  styleUrls: ['./disabling-items.page.scss'],
})
export class DisablingItemsPage implements OnInit {
  @ViewChild('loadingPortsComponent') loadingPortsComponent: IonicPickComponent;
  @ViewChild('dischargingPortsComponent') dischargingPortsComponent: IonicPickComponent;
  ports: Port[];
  loadingPorts: Port[] = [];
  dischargingPorts: Port[] = [];
  disabledLoadingPorts: Port[] = [];
  disabledDischargingPorts: Port[] = [];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  loadingPortChange(event: {
    component: IonicPickComponent,
    value: any
  }) {
    this.disabledDischargingPorts = this.loadingPorts;
  }

  dischargingPortChange(event: {
    component: IonicPickComponent,
    value: any
  }) {
    this.disabledLoadingPorts = this.dischargingPorts;
  }

  clear() {
    this.loadingPortsComponent.clear();
    this.dischargingPortsComponent.clear();
    this.disabledDischargingPorts = [];
    this.disabledLoadingPorts = [];
  }
}
