import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { DarkModeComponent } from '../../components/generics/dark-mode/dark-mode.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{
      path: '',
      component: HomePage
    }])
  ],
  declarations: [
    HomePage,
    DarkModeComponent,
  ],
  exports: [
    DarkModeComponent,
  ]
})
export class HomePageModule { }
