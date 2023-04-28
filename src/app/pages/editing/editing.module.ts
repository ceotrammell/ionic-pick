import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicPickModule } from '../../components/ionic-pick/ionic-pick.module';
import { PipesModule } from '../../pipes';
import { EditingPage } from './editing.page';

const routes: Routes = [{
  path: '',
  component: EditingPage
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicPickModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EditingPage
  ]
})
export class EditingPageModule { }
