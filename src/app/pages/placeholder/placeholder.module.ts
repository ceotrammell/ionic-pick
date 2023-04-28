import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicPickModule } from '../../components/ionic-pick/ionic-pick.module';
import { PipesModule } from '../../pipes';
import { PlaceholderPage } from './placeholder.page';

const routes: Routes = [{
  path: '',
  component: PlaceholderPage
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPickModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PlaceholderPage
  ]
})
export class PlaceholderPageModule { }
