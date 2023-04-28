import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicPickModule } from '../../components/ionic-pick/ionic-pick.module';
import { InitialValuePage } from './initial-value.page';

const routes: Routes = [{
  path: '',
  component: InitialValuePage
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPickModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InitialValuePage
  ]
})
export class InitialValuePageModule { }
