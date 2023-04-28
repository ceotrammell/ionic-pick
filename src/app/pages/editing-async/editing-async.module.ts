import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicPickModule } from '../../components/ionic-pick/ionic-pick.module';
import { PipesModule } from '../../pipes';
import { EditingAsyncPage } from './editing-async.page';

const routes: Routes = [{
  path: '',
  component: EditingAsyncPage
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
    EditingAsyncPage
  ]
})
export class EditingAsyncPageModule { }
