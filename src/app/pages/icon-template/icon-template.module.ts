import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicPickModule } from '../../components/ionic-pick/ionic-pick.module';
import { IconTemplatePage } from './icon-template.page';

const routes: Routes = [{
  path: '',
  component: IconTemplatePage
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
    IconTemplatePage
  ]
})
export class IconTemplatePageModule { }
