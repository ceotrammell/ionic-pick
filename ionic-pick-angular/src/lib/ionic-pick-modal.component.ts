import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonSearchbar, NavParams } from '@ionic/angular';
import { IonicPickComponent } from './ionic-pick.component';

@Component({
  selector: 'ionic-pick-modal',
  templateUrl: './ionic-pick-modal.component.html'
})
export class IonicPickModalComponent implements AfterViewInit {
  @ViewChild(IonContent)
  _content: IonContent;
  _header: HTMLElement;
  selectComponent: IonicPickComponent;
  @ViewChild('searchbarComponent')
  _searchbarComponent: IonSearchbar;
  @ViewChild(IonInfiniteScroll)
  _infiniteScroll: IonInfiniteScroll;
  @HostBinding('class.ionic-pick-modal')
  _cssClass = true;
  @HostBinding('class.ionic-pick-modal-can-clear')
  get _canClearCssClass(): boolean {
    return this.selectComponent.canClear;
  }
  @HostBinding('class.ionic-pick-modal-is-multiple')
  get _isMultipleCssClass(): boolean {
    return this.selectComponent.isMultiple;
  }
  @HostBinding('class.ionic-pick-modal-is-searching')
  get _isSearchingCssClass(): boolean {
    return this.selectComponent._isSearching;
  }
  @HostBinding('class.ionic-pick-modal-ios')
  get _isIos(): boolean {
    return this.selectComponent._isIos;
  }
  @HostBinding('class.ionic-pick-modal-md')
  _isMD(): boolean {
    return this.selectComponent._isMD;
  }
  @HostBinding('class.ionic-pick-modal-is-add-item-template-visible')
  get _isAddItemTemplateVisibleCssClass(): boolean {
    return this.selectComponent._isAddItemTemplateVisible;
  }
  @HostListener('window:resize')
  onResize() {
    // ion-footer inside the template might change its height when
    // device orientation changes.
    this.selectComponent._positionAddItemTemplate();
  }

  constructor(
    private navParams: NavParams,
    public _element: ElementRef,
  ) {
    this.selectComponent = this.navParams.get('selectComponent');
    this.selectComponent._modalComponent = this;
    this.selectComponent._selectedItems = [];

    if (!this.selectComponent._isNullOrWhiteSpace(this.selectComponent.value)) {
      if (this.selectComponent.isMultiple) {
        this.selectComponent.value.forEach((item: any) => {
          this.selectComponent._selectedItems.push(item);
        });
      } else {
        this.selectComponent._selectedItems.push(this.selectComponent.value);
      }
    }

    this.selectComponent._setItemsToConfirm(this.selectComponent._selectedItems);
  }

  ngAfterViewInit() {
    this._header = this._element.nativeElement.querySelector('ion-header');

    if (this._searchbarComponent && this.selectComponent.shouldFocusSearchbar) {
      // Focus after a delay because focus doesn't work without it.
      setTimeout(() => {
        this._searchbarComponent.setFocus();
      }, 1000);
    }
  }

  autoSearch() {
    this.selectComponent.autoSearch ? this.selectComponent._filterItems() : false;
  }
}
