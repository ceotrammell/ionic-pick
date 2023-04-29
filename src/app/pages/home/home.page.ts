import { Component } from '@angular/core';
import { DarkModeComponent } from '../../components/generics/dark-mode/dark-mode.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(
    private modalController: ModalController,
  ) { }

  async darkModeModal() {
    const modal = await this.modalController.create({
      component: DarkModeComponent,
      componentProps: {
      },
      canDismiss: true,
      breakpoints: [0, 0.3],
      initialBreakpoint: 0.3,
    });
    modal.present();
  }

}
