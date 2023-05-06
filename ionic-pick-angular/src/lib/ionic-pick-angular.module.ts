import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicPickAddItemTemplateDirective } from './ionic-pick-add-item-template.directive';
import { IonicPickCloseButtonTemplateDirective } from './ionic-pick-close-button-template.directive';
import { IonicPickFooterTemplateDirective } from './ionic-pick-footer-template.directive';
import { IonicPickGroupEndTemplateDirective } from './ionic-pick-group-end-template.directive';
import { IonicPickGroupTemplateDirective } from './ionic-pick-group-template.directive';
import { IonicPickHeaderTemplateDirective } from './ionic-pick-header-template.directive';
import { IonicPickItemEndTemplateDirective } from './ionic-pick-item-end-template.directive';
import { IonicPickItemIconTemplateDirective } from './ionic-pick-item-icon-template.directive';
import { IonicPickItemTemplateDirective } from './ionic-pick-item-template.directive';
import { IonicPickMessageTemplateDirective } from './ionic-pick-message-template.directive';
import { IonicPickModalComponent } from './ionic-pick-modal.component';
import { IonicPickPlaceholderTemplateDirective } from './ionic-pick-placeholder-template.directive';
import { IonicPickSearchFailTemplateDirective } from './ionic-pick-search-fail-template.directive';
import { IonicPickTitleTemplateDirective } from './ionic-pick-title-template.directive';
import { IonicPickValueTemplateDirective } from './ionic-pick-value-template.directive';
import { IonicPickIconTemplateDirective } from './ionic-pick-icon-template.directive';
import { IonicPickComponent } from './ionic-pick.component';
export { IonicPickAddItemTemplateDirective } from './ionic-pick-add-item-template.directive';
export { IonicPickCloseButtonTemplateDirective } from './ionic-pick-close-button-template.directive';
export { IonicPickFooterTemplateDirective } from './ionic-pick-footer-template.directive';
export { IonicPickGroupEndTemplateDirective } from './ionic-pick-group-end-template.directive';
export { IonicPickGroupTemplateDirective } from './ionic-pick-group-template.directive';
export { IonicPickHeaderTemplateDirective } from './ionic-pick-header-template.directive';
export { IonicPickItemEndTemplateDirective } from './ionic-pick-item-end-template.directive';
export { IonicPickItemIconTemplateDirective } from './ionic-pick-item-icon-template.directive';
export { IonicPickItemTemplateDirective } from './ionic-pick-item-template.directive';
export { IonicPickMessageTemplateDirective } from './ionic-pick-message-template.directive';
export { IonicPickModalComponent } from './ionic-pick-modal.component';
export { IonicPickPlaceholderTemplateDirective } from './ionic-pick-placeholder-template.directive';
export { IonicPickSearchFailTemplateDirective } from './ionic-pick-search-fail-template.directive';
export { IonicPickTitleTemplateDirective } from './ionic-pick-title-template.directive';
export { IonicPickValueTemplateDirective } from './ionic-pick-value-template.directive';
export { IonicPickIconTemplateDirective } from './ionic-pick-icon-template.directive';
export { IonicPickComponent } from './ionic-pick.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

const components = [IonicPickComponent, IonicPickModalComponent],
  directives = [
    IonicPickValueTemplateDirective,
    IonicPickItemTemplateDirective,
    IonicPickItemEndTemplateDirective,
    IonicPickTitleTemplateDirective,
    IonicPickPlaceholderTemplateDirective,
    IonicPickMessageTemplateDirective,
    IonicPickGroupTemplateDirective,
    IonicPickGroupEndTemplateDirective,
    IonicPickCloseButtonTemplateDirective,
    IonicPickSearchFailTemplateDirective,
    IonicPickAddItemTemplateDirective,
    IonicPickFooterTemplateDirective,
    IonicPickHeaderTemplateDirective,
    IonicPickItemIconTemplateDirective,
    IonicPickIconTemplateDirective
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,
    CdkVirtualScrollViewport,
  ],
  declarations: [
    ...components,
    ...directives
  ],
  exports: [
    ...components,
    ...directives
  ],
  entryComponents: components
})
export class IonicPickAngularModule {}
