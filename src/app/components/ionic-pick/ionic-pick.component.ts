// tslint:disable-next-line:max-line-length
import { Component, ContentChild, DoCheck, ElementRef, EventEmitter, forwardRef, HostBinding, Input, IterableDiffer, IterableDiffers, OnInit, Optional, Output, Renderer2, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonItem, ModalController, Platform } from '@ionic/angular';
import { AnimationBuilder, ModalOptions } from '@ionic/core';
import { Subscription } from 'rxjs';
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

@Component({
  selector: 'ionic-pick',
  templateUrl: './ionic-pick.component.html',
  styleUrls: ['./ionic-pick.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IonicPickComponent),
    multi: true
  }]
})
export class IonicPickComponent implements ControlValueAccessor, OnInit, DoCheck {
  @HostBinding('class.ionic-pick')
  _cssClass = true;
  @HostBinding('class.ionic-pick-ios')
  _isIos: boolean;
  @HostBinding('class.ionic-pick-md')
  _isMD: boolean;
  @HostBinding('class.ionic-pick-is-multiple')
  get _isMultipleCssClass(): boolean {
    return this.isMultiple;
  }
  @HostBinding('class.ionic-pick-has-value')
  get _hasValueCssClass(): boolean {
    return this.hasValue();
  }
  @HostBinding('class.ionic-pick-has-placeholder')
  get _hasPlaceholderCssClass(): boolean {
    return this._hasPlaceholder;
  }
  @HostBinding('class.ionic-pick-has-label')
  get _hasIonLabelCssClass(): boolean {
    return this._hasIonLabel;
  }
  @HostBinding('class.ionic-pick-label-default')
  get _hasDefaultIonLabelCssClass(): boolean {
    return this._ionLabelPosition === 'default';
  }
  @HostBinding('class.ionic-pick-label-fixed')
  get _hasFixedIonLabelCssClass(): boolean {
    return this._ionLabelPosition === 'fixed';
  }
  @HostBinding('class.ionic-pick-label-stacked')
  get _hasStackedIonLabelCssClass(): boolean {
    return this._ionLabelPosition === 'stacked';
  }
  @HostBinding('class.ionic-pick-label-floating')
  get _hasFloatingIonLabelCssClass(): boolean {
    return this._ionLabelPosition === 'floating';
  }
  private _isOnSearchEnabled = true;
  private _isEnabled = true;
  private _shouldBackdropClose = true;
  private _isOpened = false;
  private _value: any = null;
  private _modal: HTMLIonModalElement;
  private _itemsDiffer: IterableDiffer<any>;
  private _hasObjects: boolean;
  private _canClear = false;
  private _hasConfirmButton = false;
  private _isMultiple = false;
  private _canAddItem = false;
  private _addItemObservable: Subscription;
  private _deleteItemObservable: Subscription;
  private onItemsChange: EventEmitter<any> = new EventEmitter();
  private _ionItemElement: any;
  private _ionLabelElement: any;
  private _hasIonLabel = false;
  private _ionLabelPosition: 'fixed' | 'stacked' | 'floating' | 'default' | null = null;
  private _label: string = '';
  private get _hasInfiniteScroll(): boolean {
    return this.isEnabled && this._modalComponent &&
      this._modalComponent._infiniteScroll ? true : false;
  }
  get _shouldStoreItemValue(): boolean {
    return this.shouldStoreItemValue && this._hasObjects;
  }
  _valueItems: any[] = [];
  _searchText = '';
  _hasSearchText = false;
  _groups: any[] = [];
  _itemsToConfirm: any[] = [];
  _selectedItems: any[] = [];
  _modalComponent: IonicPickModalComponent;
  _filteredGroups: any[] = [];
  _hasGroups: boolean;
  _isSearching: boolean;
  _hasPlaceholder: boolean;
  _isAddItemTemplateVisible = false;
  _isFooterVisible = true;
  _itemToAdd: any = null;
  _footerButtonsCount = 0;
  _hasFilteredItems = false;

  /**
   * Text of [Ionic Label](https://ionicframework.com/docs/api/label).
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#label).
   *
   * @readonly
   * @default null
   * @memberof IonicPickComponent
   */
  get label(): string {
    return this._label;
  }

  /**
   * Text that the user has typed in Searchbar.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#searchtext).
   *
   * @readonly
   * @default ''
   * @memberof IonicPickComponent
   */
  get searchText(): string {
    return this._searchText;
  }
  set searchText(searchText: string) {
    this._searchText = searchText;
    this._setHasSearchText();
  }

  /**
   * Determines whether search is running.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#issearching).
   *
   * @default false
   * @readonly
   * @memberof IonicPickComponent
   */
  get isSearching(): boolean {
    return this._isSearching;
  }

  /**
   * Determines whether user has typed anything in Searchbar.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#hassearchtext).
   *
   * @default false
   * @readonly
   * @memberof IonicPickComponent
   */
  get hasSearchText(): boolean {
    return this._hasSearchText;
  }

  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this._value = value;

    // Set value items.
    this._valueItems.splice(0, this._valueItems.length);

    if (this.isMultiple) {
      if (value && value.length) {
        Array.prototype.push.apply(this._valueItems, value);
      }
    } else {
      if (!this._isNullOrWhiteSpace(value)) {
        this._valueItems.push(value);
      }
    }

    this._setIonItemHasValue();
    this._setHasPlaceholder();
  }

  /**
   * A list of items.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#items).
   *
   * @default []
   * @memberof IonicPickComponent
   */
  @Input()
  items: any[] = [];
  @Output()
  itemsChange: EventEmitter<any> = new EventEmitter();

  /**
   * Determines whether the component is enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#isenabled).
   *
   * @default true
   * @memberof IonicPickComponent
   */
  @HostBinding('class.ionic-pick-is-enabled')
  @Input('isEnabled')
  get isEnabled(): boolean {
    return this._isEnabled;
  }
  set isEnabled(isEnabled: boolean) {
    this._isEnabled = !!isEnabled;
    this.enableIonItem(this._isEnabled);
  }

  /**
   * Determines whether Modal should be closed when backdrop is clicked.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#shouldbackdropclose).
   *
   * @default true
   * @memberof IonicPickComponent
   */
  @Input('shouldBackdropClose')
  get shouldBackdropClose(): boolean {
    return this._shouldBackdropClose;
  }
  set shouldBackdropClose(shouldBackdropClose: boolean) {
    this._shouldBackdropClose = !!shouldBackdropClose;
  }

  /**
   * Modal CSS class.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#modalcssclass).
   *
   * @default null
   * @memberof IonicPickComponent
   */
  @Input()
  modalCssClass: string = '';

  /**
   * Modal enter animation.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#modalenteranimation).
   *
   * @default null
   * @memberof IonicPickComponent
   */
  @Input()
  modalEnterAnimation: AnimationBuilder;

  /**
   * Modal leave animation.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#modalleaveanimation).
   *
   * @default null
   * @memberof IonicPickComponent
   */
  @Input()
  modalLeaveAnimation: AnimationBuilder;

  /**
   * Determines whether Modal is opened.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#isopened).
   *
   * @default false
   * @readonly
   * @memberof IonicPickComponent
   */
  get isOpened(): boolean {
    return this._isOpened;
  }

  /**
   * Determines whether Confirm button is enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#isconfirmbuttonenabled).
   *
   * @default true
   * @memberof IonicPickComponent
   */
  @Input()
  isConfirmButtonEnabled = true;

  /**
 * Determines whether Confirm button is visible for single selection.
 * By default Confirm button is visible only for multiple selection.
 * **Note**: It is always true for multiple selection and cannot be changed.
 * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#hasconfirmbutton).
 *
 * @default true
 * @memberof IonicPickComponent
 */
  @Input('hasConfirmButton')
  get hasConfirmButton(): boolean {
    return this._hasConfirmButton;
  }
  set hasConfirmButton(hasConfirmButton: boolean) {
    this._hasConfirmButton = !!hasConfirmButton;
    this._countFooterButtons();
  }

  /**
   * Item property to use as a unique identifier, e.g, `'id'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#itemvaluefield).
   *
   * @default null
   * @memberof IonicPickComponent
   */
  @Input()
  itemValueField: string = '';

  /**
   * Item property to display, e.g, `'name'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#itemtextfield).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input()
  itemTextField: string = '';

  /**
   *
   * Group property to use as a unique identifier to group items, e.g. `'country.id'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#groupvaluefield).
   *
   * @default null
   * @memberof IonicPickComponent
   */
  @Input()
  groupValueField: string = '';

  /**
* Group property to display, e.g. `'country.name'`.
* **Note**: `items` should be an object array.
* See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#grouptextfield).
*
* @default null
* @memberof IonicPickComponent
*/
  @Input()
  groupTextField: string = '';

  /**
   * Determines whether to show Searchbar.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#cansearch).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input()
  canSearch = false;

  /**
   * Determines whether `onSearch` event is enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#isonsearchenabled).
   *
   * @default true
   * @memberof IonicPickComponent
   */
  @Input('isOnSearchEnabled')
  get isOnSearchEnabled(): boolean {
    return this._isOnSearchEnabled;
  }
  set isOnSearchEnabled(isOnSearchEnabled: boolean) {
    this._isOnSearchEnabled = !!isOnSearchEnabled;
  }

  /**
   * Determines whether to show Clear button.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#canclear).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @HostBinding('class.ionic-pick-can-clear')
  @Input('canClear')
  get canClear(): boolean {
    return this._canClear;
  }
  set canClear(canClear: boolean) {
    this._canClear = !!canClear;
    this._countFooterButtons();
  }

  /**
   * Determines whether Ionic [InfiniteScroll](https://ionicframework.com/docs/api/components/infinite-scroll/InfiniteScroll/) is enabled.
   * **Note**: Infinite scroll cannot be used together with virtual scroll.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#hasinfinitescroll).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input()
  hasInfiniteScroll = false;

  /**
   * Determines whether Ionic [VirtualScroll](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/) is enabled.
   * **Note**: Virtual scroll cannot be used together with infinite scroll.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#hasvirtualscroll).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input()
  hasVirtualScroll = false;

  /**
   * See Ionic VirtualScroll [approxItemHeight](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/).
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#virtualscrollapproxitemheight).
   *
   * @default '40px'
   * @memberof IonicPickComponent
   */
  @Input()
  virtualScrollApproxItemHeight = '40px';

  /**
   * A placeholder for Searchbar.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#searchplaceholder).
   *
   * @default 'Search'
   * @memberof IonicPickComponent
   */
  @Input()
  searchPlaceholder = 'Search';

  /**
   * A placeholder.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#placeholder).
   *
   * @default null
   * @memberof IonicPickComponent
   */
  @Input()
  placeholder: string = '';

  /**
   * Determines whether multiple items can be selected.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#ismultiple).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input('isMultiple')
  get isMultiple(): boolean {
    return this._isMultiple;
  }
  set isMultiple(isMultiple: boolean) {
    this._isMultiple = !!isMultiple;
    this._countFooterButtons();
  }

  /**
   * Text to display when no items have been found during search.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#searchfailtext).
   *
   * @default 'No items found.'
   * @memberof IonicPickComponent
   */
  @Input()
  searchFailText = 'No items found.';

  /**
   * Clear button text.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#clearbuttontext).
   *
   * @default 'Clear'
   * @memberof IonicPickComponent
   */
  @Input()
  clearButtonText = 'Clear';

  /**
   * Add button text.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#addbuttontext).
   *
   * @default 'Add'
   * @memberof IonicPickComponent
   */
  @Input()
  addButtonText = 'Add';

  /**
   * Confirm button text.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#confirmbuttontext).
   *
   * @default 'OK'
   * @memberof IonicPickComponent
   */
  @Input()
  confirmButtonText = 'OK';

  /**
   * Close button text.
   * The field is only applicable to **iOS** platform, on **Android** only Cross icon is displayed.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#closebuttontext).
   *
   * @default 'Cancel'
   * @memberof IonicPickComponent
   */
  @Input()
  closeButtonText = 'Cancel';

  /**
   * Determines whether Searchbar should receive focus when Modal is opened.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#shouldfocussearchbar).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input()
  shouldFocusSearchbar = false;

  /**
   * Header color. [Ionic colors](https://ionicframework.com/docs/theming/advanced#colors) are supported.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#headercolor).
   *
   * @default null
   * @memberof IonicPickComponent
   */
  @Input()
  headerColor: string = '';

  /**
   * Group color. [Ionic colors](https://ionicframework.com/docs/theming/advanced#colors) are supported.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#groupcolor).
   *
   * @default null
   * @memberof IonicPickComponent
   */
  @Input()
  groupColor: string = '';

  /**
   * Close button slot. [Ionic slots](https://ionicframework.com/docs/api/buttons) are supported.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#closebuttonslot).
   *
   * @default 'start'
   * @memberof IonicPickComponent
   */
  @Input()
  closeButtonSlot = 'start';

  /**
   * Item icon slot. [Ionic slots](https://ionicframework.com/docs/api/item) are supported.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#itemiconslot).
   *
   * @default 'start'
   * @memberof IonicPickComponent
   */
  @Input()
  itemIconSlot = 'start';

  /**
   * Fires when item/s has been selected and Modal closed.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onchange).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onChange: EventEmitter<{ component: IonicPickComponent, value: any }> = new EventEmitter();

  /**
   * Fires when the user is typing in Searchbar.
   * **Note**: `canSearch` and `isOnSearchEnabled` has to be enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onsearch).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onSearch: EventEmitter<{ component: IonicPickComponent, text: string }> = new EventEmitter();

  /**
   * Fires when no items have been found.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onsearchfail).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onSearchFail: EventEmitter<{ component: IonicPickComponent, text: string }> = new EventEmitter();

  /**
   * Fires when some items have been found.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onsearchsuccess).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onSearchSuccess: EventEmitter<{ component: IonicPickComponent, text: string }> = new EventEmitter();

  /**
   * Fires when the user has scrolled to the end of the list.
   * **Note**: `hasInfiniteScroll` has to be enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#oninfinitescroll).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onInfiniteScroll: EventEmitter<{ component: IonicPickComponent, text: string }> = new EventEmitter();

  /**
   * Fires when Modal has been opened.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onopen).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onOpen: EventEmitter<{ component: IonicPickComponent }> = new EventEmitter();

  /**
   * Fires when Modal has been closed.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onclose).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onClose: EventEmitter<{ component: IonicPickComponent }> = new EventEmitter();

  /**
   * Fires when an item has been selected or unselected.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onselect).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onSelect: EventEmitter<{ component: IonicPickComponent, item: any, isSelected: boolean }> = new EventEmitter();

  /**
   * Fires when Clear button has been clicked.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onclear).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onClear: EventEmitter<{ component: IonicPickComponent, items: any[] }> = new EventEmitter();

  /**
   * A list of items that are selected and awaiting confirmation by user, when he has clicked Confirm button.
   * After the user has clicked Confirm button items to confirm are cleared.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#itemstoconfirm).
   *
   * @default []
   * @readonly
   * @memberof IonicPickComponent
   */
  get itemsToConfirm(): any[] {
    return this._itemsToConfirm;
  }

  /**
   * How long, in milliseconds, to wait to filter items or to trigger `onSearch` event after each keystroke.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#searchdebounce).
   *
   * @default 250
   * @memberof IonicPickComponent
   */
  @Input()
  searchDebounce: Number = 250;

  /**
   * Determimes whether or not searching will automatically search. autoSearch is enabled by default and
   * will trigged based on `searchDebounce` value.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#autosearch).
   *
   * @default true
   * @memberof IonicPickComponent
   */
  @Input()
  autoSearch: Boolean = true;

  /**
   * A list of items to disable.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#disableditems).
   *
   * @default []
   * @memberof IonicPickComponent
   */
  @Input()
  disabledItems: any[] = [];

  /**
   * Determines whether item value only should be stored in `ngModel`, not the entire item.
   * **Note**: Item value is defined by `itemValueField`.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#shouldstoreitemvalue).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input()
  shouldStoreItemValue = false;

  /**
   * Determines whether to allow editing items.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#cansaveitem).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input()
  canSaveItem = false;

  /**
   * Determines whether to allow deleting items.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#candeleteitem).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input()
  canDeleteItem = false;

  /**
   * Determines whether to allow adding items.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#canadditem).
   *
   * @default false
   * @memberof IonicPickComponent
   */
  @Input('canAddItem')
  get canAddItem(): boolean {
    return this._canAddItem;
  }
  set canAddItem(canAddItem: boolean) {
    this._canAddItem = !!canAddItem;
    this._countFooterButtons();
  }

  /**
   * Fires when Edit item button has been clicked.
   * When the button has been clicked `ionicPickAddItemTemplate` will be shown. Use the template to create a form to edit item.
   * **Note**: `canSaveItem` has to be enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onsaveitem).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onSaveItem: EventEmitter<{ component: IonicPickComponent, item: any }> = new EventEmitter();

  /**
   * Fires when Delete item button has been clicked.
   * **Note**: `canDeleteItem` has to be enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#ondeleteitem).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onDeleteItem: EventEmitter<{ component: IonicPickComponent, item: any }> = new EventEmitter();

  /**
   * Fires when Add item button has been clicked.
   * When the button has been clicked `ionicPickAddItemTemplate` will be shown. Use the template to create a form to add item.
   * **Note**: `canAddItem` has to be enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#onadditem).
   *
   * @memberof IonicPickComponent
   */
  @Output()
  onAddItem: EventEmitter<{ component: IonicPickComponent }> = new EventEmitter();

  @ContentChild(IonicPickValueTemplateDirective, { read: TemplateRef })
  valueTemplate: TemplateRef<any>;
  @ContentChild(IonicPickItemTemplateDirective, { read: TemplateRef })
  itemTemplate: TemplateRef<any>;
  @ContentChild(IonicPickItemEndTemplateDirective, { read: TemplateRef })
  itemEndTemplate: TemplateRef<any>;
  @ContentChild(IonicPickTitleTemplateDirective, { read: TemplateRef })
  titleTemplate: TemplateRef<any>;
  @ContentChild(IonicPickPlaceholderTemplateDirective, { read: TemplateRef })
  placeholderTemplate: TemplateRef<any>;
  @ContentChild(IonicPickMessageTemplateDirective, { read: TemplateRef })
  messageTemplate: TemplateRef<any>;
  @ContentChild(IonicPickGroupTemplateDirective, { read: TemplateRef })
  groupTemplate: TemplateRef<any>;
  @ContentChild(IonicPickGroupEndTemplateDirective, { read: TemplateRef })
  groupEndTemplate: TemplateRef<any>;
  @ContentChild(IonicPickCloseButtonTemplateDirective, { read: TemplateRef })
  closeButtonTemplate: TemplateRef<any>;
  @ContentChild(IonicPickSearchFailTemplateDirective, { read: TemplateRef })
  searchFailTemplate: TemplateRef<any>;
  @ContentChild(IonicPickAddItemTemplateDirective, { read: TemplateRef })
  addItemTemplate: TemplateRef<any>;
  @ContentChild(IonicPickFooterTemplateDirective, { read: TemplateRef })
  footerTemplate: TemplateRef<any>;
  _addItemTemplateFooterHeight: string;
  @ContentChild(IonicPickHeaderTemplateDirective, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;
  @ContentChild(IonicPickItemIconTemplateDirective, { read: TemplateRef })
  itemIconTemplate: TemplateRef<any>;
  @ContentChild(IonicPickIconTemplateDirective, { read: TemplateRef })
  iconTemplate: TemplateRef<any>;

  /**
   * See Ionic VirtualScroll [headerFn](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/).
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#virtualscrollheaderfn).
   *
   * @memberof IonicPickComponent
   */
  @Input()
  virtualScrollHeaderFn = () => {
    return null;
  }

  constructor(
    private _modalController: ModalController,
    private _platform: Platform,
    @Optional() private ionItem: IonItem,
    private _iterableDiffers: IterableDiffers,
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {
    if (!this.items || !this.items.length) {
      this.items = [];
    }

    this._itemsDiffer = this._iterableDiffers.find(this.items).create();
  }

  initFocus() { }

  enableIonItem(isEnabled: boolean) {
    if (!this.ionItem) {
      return;
    }

    this.ionItem.disabled = !isEnabled;
  }

  _isNullOrWhiteSpace(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    // Convert value to string in case if it's not.
    return value.toString().replace(/\s/g, '').length < 1;
  }

  _setHasSearchText() {
    this._hasSearchText = !this._isNullOrWhiteSpace(this._searchText);
  }

  _hasOnSearch(): boolean {
    return this.isOnSearchEnabled && this.onSearch.observers.length > 0;
  }

  _hasOnSaveItem(): boolean {
    return this.canSaveItem && this.onSaveItem.observers.length > 0;
  }

  _hasOnAddItem(): boolean {
    return this.canAddItem && this.onAddItem.observers.length > 0;
  }

  _hasOnDeleteItem(): boolean {
    return this.canDeleteItem && this.onDeleteItem.observers.length > 0;
  }

  _emitValueChange() {
    this.propagateOnChange(this.value);

    this.onChange.emit({
      component: this,
      value: this.value
    });
  }

  _emitSearch() {
    if (!this.canSearch) {
      return;
    }

    this.onSearch.emit({
      component: this,
      text: this._searchText
    });
  }

  _emitOnSelect(item: any, isSelected: boolean) {
    this.onSelect.emit({
      component: this,
      item: item,
      isSelected: isSelected
    });
  }

  _emitOnClear(items: any[]) {
    this.onClear.emit({
      component: this,
      items: items
    });
  }

  _emitOnSearchSuccessOrFail(isSuccess: boolean) {
    const eventData = {
      component: this,
      text: this._searchText
    };

    if (isSuccess) {
      this.onSearchSuccess.emit(eventData);
    } else {
      this.onSearchFail.emit(eventData);
    }
  }

  _formatItem(item: any): string {
    if (this._isNullOrWhiteSpace(item)) {
      return '';
    }

    return this.itemTextField ? item[this.itemTextField] : item.toString();
  }

  _formatValueItem(item: any): string {
    if (this._shouldStoreItemValue) {
      // Get item text from the list as we store it's value only.
      const selectedItem = this.items.find(_item => {
        return _item[this.itemValueField] === item;
      });

      return this._formatItem(selectedItem);
    } else {
      return this._formatItem(item);
    }
  }

  _getItemValue(item: any): any {
    if (!this._hasObjects) {
      return item;
    }

    return item[this.itemValueField];
  }

  _getStoredItemValue(item: any): any {
    if (!this._hasObjects) {
      return item;
    }

    return this._shouldStoreItemValue ? item : item[this.itemValueField];
  }

  _onSearchbarClear() {
    // Ionic Searchbar doesn't clear bind with ngModel value.
    // Do it ourselves.
    this._searchText = '';
  }

  _filterItems() {
    this._setHasSearchText();

    if (this._hasOnSearch()) {
      // Delegate filtering to the event.
      this._emitSearch();
    } else {
      // Default filtering.
      let groups: Array<any> = [];

      if (!this._searchText || !this._searchText.trim()) {
        groups = this._groups;
      } else {
        const filterText = this._searchText.trim().toLowerCase();

        this._groups.forEach(group => {
          const items = group.items.filter((item: any) => {
            const itemText = (this.itemTextField ?
              item[this.itemTextField] : item).toString().toLowerCase();
            return itemText.indexOf(filterText) !== -1;
          });

          if (items.length) {
            groups.push({
              value: group.value,
              text: group.text,
              items: items
            });
          }
        });

        // No items found.
        if (!groups.length) {
          groups.push({
            items: []
          });
        }
      }

      this._filteredGroups = groups;
      this._hasFilteredItems = !this._areGroupsEmpty(groups);
      this._emitOnSearchSuccessOrFail(this._hasFilteredItems);
    }
  }

  _isItemDisabled(item: any): boolean {
    if (!this.disabledItems) {
      return true;
    }

    return this.disabledItems.some(_item => {
      return this._getItemValue(_item) === this._getItemValue(item);
    });
  }

  _isItemSelected(item: any) {
    return this._selectedItems.find(selectedItem => {
      return this._getItemValue(item) === this._getStoredItemValue(selectedItem);
    }) !== undefined;
  }

  _addSelectedItem(item: any) {
    if (this._shouldStoreItemValue) {
      this._selectedItems.push(this._getItemValue(item));
    } else {
      this._selectedItems.push(item);
    }
  }

  _deleteSelectedItem(item: any) {
    let itemToDeleteIndex = 0;

    this._selectedItems.forEach((selectedItem, itemIndex) => {
      if (
        this._getItemValue(item) ===
        this._getStoredItemValue(selectedItem)
      ) {
        itemToDeleteIndex = itemIndex;
      }
    });

    this._selectedItems.splice(itemToDeleteIndex, 1);
  }

  _click() {
    if (!this.isEnabled) {
      return;
    }

    this._label = this._getLabelText();
    this.open().then(() => {
      this.onOpen.emit({
        component: this
      });
    });
  }

  _saveItem(event: Event, item: any) {
    event.stopPropagation();
    this._itemToAdd = item;

    if (this._hasOnSaveItem()) {
      this.onSaveItem.emit({
        component: this,
        item: this._itemToAdd
      });
    } else {
      this.showAddItemTemplate();
    }
  }

  _deleteItemClick(event: Event, item: any) {
    event.stopPropagation();
    this._itemToAdd = item;

    if (this._hasOnDeleteItem()) {
      // Delegate logic to event.
      this.onDeleteItem.emit({
        component: this,
        item: this._itemToAdd
      });
    } else {
      this.deleteItem(this._itemToAdd);
    }
  }

  _addItemClick() {
    if (this._hasOnAddItem()) {
      this.onAddItem.emit({
        component: this
      });
    } else {
      this.showAddItemTemplate();
    }
  }

  _positionAddItemTemplate() {
    // Wait for the template to render.
    setTimeout(() => {
      const footer = this._modalComponent._element.nativeElement
        .querySelector('.ionic-pick-add-item-template ion-footer');

      this._addItemTemplateFooterHeight = footer ? `calc(100% - ${footer.offsetHeight}px)` : '100%';
    }, 100);
  }

  _close() {
    this.close().then(() => {
      this.onClose.emit({
        component: this
      });
    });

    if (!this._hasOnSearch()) {
      this._searchText = '';
      this._setHasSearchText();
    }
  }

  _clear() {
    const selectedItems = this._selectedItems;

    this.clear();
    this._emitValueChange();
    this._emitOnClear(selectedItems);
    this.close().then(() => {
      this.onClose.emit({
        component: this
      });
    });
  }

  _getMoreItems() {
    this.onInfiniteScroll.emit({
      component: this,
      text: this._searchText
    });
  }

  _setItemsToConfirm(items: any[]) {
    let itemsBlank: Array<any> = [];
    // Return a copy of original array, so it couldn't be changed from outside.
    this._itemsToConfirm = itemsBlank.concat(items);
  }

  _doSelect(selectedItem: any) {
    this.value = selectedItem;
    this._emitValueChange();
  }

  _select(item: any) {
    const isItemSelected = this._isItemSelected(item);

    if (this.isMultiple) {
      if (isItemSelected) {
        this._deleteSelectedItem(item);
      } else {
        this._addSelectedItem(item);
      }

      this._setItemsToConfirm(this._selectedItems);

      // Emit onSelect event after setting items to confirm so they could be used
      // inside the event.
      this._emitOnSelect(item, !isItemSelected);
    } else {
      if (this.hasConfirmButton || this.footerTemplate) {
        // Don't close Modal and keep track on items to confirm.
        // When footer template is used it's up to developer to close Modal.
        this._selectedItems = [];

        if (isItemSelected) {
          this._deleteSelectedItem(item);
        } else {
          this._addSelectedItem(item);
        }

        this._setItemsToConfirm(this._selectedItems);

        // Emit onSelect event after setting items to confirm so they could be used
        // inside the event.
        this._emitOnSelect(item, !isItemSelected);
      } else {
        if (!isItemSelected) {
          this._selectedItems = [];
          this._addSelectedItem(item);

          // Emit onSelect before onChange.
          this._emitOnSelect(item, true);

          if (this._shouldStoreItemValue) {
            this._doSelect(this._getItemValue(item));
          } else {
            this._doSelect(item);
          }
        }

        this._close();
      }
    }
  }

  _confirm() {
    this.confirm();
    this._close();
  }

  private _getLabelText(): string {
    return this._ionLabelElement ? this._ionLabelElement.textContent : null;
  }

  private _areGroupsEmpty(groups: any) {
    return groups.length === 0 || groups.every((group: any) => {
      return !group.items || group.items.length === 0;
    });
  }

  private _countFooterButtons() {
    let footerButtonsCount = 0;

    if (this.canClear) {
      footerButtonsCount++;
    }

    if (this.isMultiple || this._hasConfirmButton) {
      footerButtonsCount++;
    }

    if (this.canAddItem) {
      footerButtonsCount++;
    }

    this._footerButtonsCount = footerButtonsCount;
  }

  private _setItems(items: any[]) {
    // It's important to have an empty starting group with empty items (groups[0].items),
    // because we bind to it when using VirtualScroll.
    // See https://github.com/ceotrammell/ionic-pick/issues/70.
    let groups: any[] = [{
      items: items || []
    }];

    if (items && items.length) {
      if (this._hasGroups) {
        groups = [];

        items.forEach(item => {
          const groupValue = this._getPropertyValue(item, this.groupValueField),
            group = groups.find(_group => _group.value === groupValue);

          if (group) {
            group.items.push(item);
          } else {
            groups.push({
              value: groupValue,
              text: this._getPropertyValue(item, this.groupTextField),
              items: [item]
            });
          }
        });
      }
    }

    this._groups = groups;
    this._filteredGroups = this._groups;
    this._hasFilteredItems = !this._areGroupsEmpty(this._filteredGroups);
  }

  private _getPropertyValue(object: any, property: string): any {
    if (!property) {
      return null;
    }

    return property.split('.').reduce((_object, _property) => {
      return _object ? _object[_property] : null;
    }, object);
  }

  private _setIonItemHasFocus(hasFocus: boolean) {
    if (!this.ionItem) {
      return;
    }

    // Apply focus CSS class for proper stylying of ion-item/ion-label.
    this._setIonItemCssClass('item-has-focus', hasFocus);
  }

  private _setIonItemHasValue() {
    if (!this.ionItem) {
      return;
    }

    // Apply value CSS class for proper stylying of ion-item/ion-label.
    this._setIonItemCssClass('item-has-value', this.hasValue());
  }

  private _setHasPlaceholder() {
    this._hasPlaceholder = !this.hasValue() &&
      (!this._isNullOrWhiteSpace(this.placeholder) || this.placeholderTemplate) ?
      true : false;
  }

  private propagateOnChange = (_: any) => { };
  private propagateOnTouched = () => { };

  private _setIonItemCssClass(cssClass: string, shouldAdd: boolean) {
    if (!this._ionItemElement) {
      return;
    }

    // Change to Renderer2
    if (shouldAdd) {
      this._renderer.addClass(this._ionItemElement, cssClass);
    } else {
      this._renderer.removeClass(this._ionItemElement, cssClass);
    }
  }

  private _toggleAddItemTemplate(isVisible: boolean) {
    // It should be possible to show/hide the template regardless
    // canAddItem or canSaveItem parameters, so we could implement some
    // custom behavior. E.g. adding item when search fails using onSearchFail event.
    if (!this.addItemTemplate) {
      return;
    }

    // To make SaveItemTemplate visible we just position it over list using CSS.
    // We don't hide list with *ngIf or [hidden] to prevent its scroll position.
    this._isAddItemTemplateVisible = isVisible;
    this._isFooterVisible = !isVisible;
  }

  /* ControlValueAccessor */
  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(method: any): void {
    this.propagateOnChange = method;
  }

  registerOnTouched(method: () => void) {
    this.propagateOnTouched = method;
  }

  setDisabledState(isDisabled: boolean) {
    this.isEnabled = !isDisabled;
  }
  /* .ControlValueAccessor */

  ngOnInit() {
    this._isIos = this._platform.is('ios');
    this._isMD = !this._isIos;
    this._hasObjects = !this._isNullOrWhiteSpace(this.itemValueField);
    // Grouping is supported for objects only.
    // Ionic VirtualScroll has it's own implementation of grouping.
    this._hasGroups = Boolean(this._hasObjects && this.groupValueField && !this.hasVirtualScroll);

    if (this.ionItem) {
      this._ionItemElement = this._element.nativeElement.closest('ion-item');
      this._setIonItemCssClass('item-interactive', true);
      this._setIonItemCssClass('item-ionic-pick', true);

      if (this._ionItemElement) {
        this._ionLabelElement = this._ionItemElement.querySelector('ion-label');

        if (this._ionLabelElement) {
          this._hasIonLabel = true;
          this._ionLabelPosition = this._ionLabelElement.getAttribute('position') || 'default';
        }
      }
    }

    this.enableIonItem(this.isEnabled);
  }

  ngDoCheck() {
    const itemsChanges = this._itemsDiffer.diff(this.items);

    if (itemsChanges) {
      this._setItems(this.items);
      this.value = this.value;

      this.onItemsChange.emit({
        component: this
      });
    }
  }

  /**
   * Adds item.
   * **Note**: If you want an item to be added to the original array as well use two-way data binding syntax on `[(items)]` field.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#additem).
   *
   * @param item Item to add.
   * @returns Promise that resolves when item has been added.
   * @memberof IonicPickComponent
   */
  addItem(item: any): Promise<any> {
    const self = this;

    // Adding item triggers onItemsChange.
    // Return a promise that resolves when onItemsChange finishes.
    // We need a promise or user could do something after item has been added,
    // e.g. use search() method to find the added item.
    this.items.unshift(item);

    // Close any running subscription.
    if (this._addItemObservable) {
      this._addItemObservable.unsubscribe();
    }

    return new Promise(function (resolve, reject) {
      // Complete callback isn't fired for some reason,
      // so unsubscribe in both success and fail cases.
      self._addItemObservable = self.onItemsChange.asObservable().subscribe(() => {
        self._addItemObservable.unsubscribe();
        resolve(true);
      }, () => {
        self._addItemObservable.unsubscribe();
        reject();
      });
    });
  }

  /**
 * Deletes item.
 * **Note**: If you want an item to be deleted from the original array as well use two-way data binding syntax on `[(items)]` field.
 * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#deleteitem).
 *
 * @param item Item to delete.
 * @returns Promise that resolves when item has been deleted.
 * @memberof IonicPickComponent
 */
  deleteItem(item: any): Promise<any> {
    const self = this;
    let hasValueChanged = false;

    // Remove deleted item from selected items.
    if (this._selectedItems) {
      this._selectedItems = this._selectedItems.filter(_item => {
        return this._getItemValue(item) !== this._getStoredItemValue(_item);
      });
    }

    // Remove deleted item from value.
    if (this.value) {
      if (this.isMultiple) {
        const values = this.value.filter((value: any) => {
          return value.id !== item.id;
        });

        if (values.length !== this.value.length) {
          this.value = values;
          hasValueChanged = true;
        }
      } else {
        if (item === this.value) {
          this.value = null;
          hasValueChanged = true;
        }
      }
    }

    if (hasValueChanged) {
      this._emitValueChange();
    }

    // Remove deleted item from list.
    const items = this.items.filter(_item => {
      return _item.id !== item.id;
    });

    // Refresh items on parent component.
    this.itemsChange.emit(items);

    // Refresh list.
    this._setItems(items);

    this.onItemsChange.emit({
      component: this
    });

    // Close any running subscription.
    if (this._deleteItemObservable) {
      this._deleteItemObservable.unsubscribe();
    }

    return new Promise(function (resolve, reject) {
      // Complete callback isn't fired for some reason,
      // so unsubscribe in both success and fail cases.
      self._deleteItemObservable = self.onItemsChange.asObservable().subscribe(() => {
        self._deleteItemObservable.unsubscribe();
        resolve(true);
      }, () => {
        self._deleteItemObservable.unsubscribe();
        reject();
      });
    });
  }

  /**
   * Determines whether any item has been selected.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#hasvalue).
   *
   * @returns A boolean determining whether any item has been selected.
   * @memberof IonicPickComponent
   */
  hasValue(): boolean {
    if (this.isMultiple) {
      return this._valueItems.length !== 0;
    } else {
      return this._valueItems.length !== 0 && !this._isNullOrWhiteSpace(this._valueItems[0]);
    }
  }

  /**
   * Opens Modal.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#open).
   *
   * @returns Promise that resolves when Modal has been opened.
   * @memberof IonicPickComponent
   */
  open(): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self._isEnabled || self._isOpened) {
        reject('IonicPick is disabled or already opened.');
        return;
      }

      self._filterItems();
      self._isOpened = true;

      const modalOptions: ModalOptions = {
        component: IonicPickModalComponent,
        componentProps: { selectComponent: self },
        backdropDismiss: self._shouldBackdropClose
      };

      if (self.modalCssClass) {
        modalOptions.cssClass = self.modalCssClass;
      }

      if (self.modalEnterAnimation) {
        modalOptions.enterAnimation = self.modalEnterAnimation;
      }

      if (self.modalLeaveAnimation) {
        modalOptions.leaveAnimation = self.modalLeaveAnimation;
      }

      self._modalController.create(modalOptions).then(modal => {
        self._modal = modal;
        modal.present().then(() => {
          // Set focus after Modal has opened to avoid flickering of focus highlighting
          // before Modal opening.
          self._setIonItemHasFocus(true);
          resolve();
        });

        modal.onWillDismiss().then(() => {
          self._setIonItemHasFocus(false);
        });

        modal.onDidDismiss().then(event => {
          self._isOpened = false;
          self._itemsToConfirm = [];

          // Closed by clicking on backdrop outside modal.
          if (event.role === 'backdrop') {
            self.onClose.emit({
              component: self
            });
          }
        });
      });
    });
  }

  /**
   * Closes Modal.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#close).
   *
   * @returns Promise that resolves when Modal has been closed.
   * @memberof IonicPickComponent
   */
  close(): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self._isEnabled || !self._isOpened) {
        reject('IonicPick is disabled or already closed.');
        return;
      }

      self.propagateOnTouched();
      self._isOpened = false;
      self._itemToAdd = null;
      self._modal.dismiss().then(() => {
        self._setIonItemHasFocus(false);
        self.hideAddItemTemplate();
        resolve();
      });
    });
  }

  /**
   * Clears value.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#clear).
   *
   * @memberof IonicPickComponent
   */
  clear() {
    this.value = this.isMultiple ? [] : null;
    this._itemsToConfirm = [];
    this.propagateOnChange(this.value);
  }

  /**
   * Confirms selected items by updating value.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#confirm).
   *
   * @memberof IonicPickComponent
   */
  confirm() {
    if (this.isMultiple) {
      this._doSelect(this._selectedItems);
    } else if (this.hasConfirmButton || this.footerTemplate) {
      this._doSelect(this._selectedItems[0] || null);
    }
  }

  /**
   * Selects or deselects all or specific items.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#toggleitems).
   *
   * @param isSelect Determines whether to select or deselect items.
   * @param [items] Items to toggle. If items are not set all items will be toggled.
   * @memberof IonicPickComponent
   */
  toggleItems(isSelect: boolean, items?: any[]) {
    if (isSelect) {
      const hasItems = items && items.length;
      let itemsToToggle = this._groups.reduce((allItems, group) => {
        return allItems.concat(group.items);
      }, []);

      // Don't allow to select all items in single mode.
      if (!this.isMultiple && !hasItems) {
        itemsToToggle = [];
      }

      // Toggle specific items.
      if (hasItems) {
        itemsToToggle = itemsToToggle.filter((itemToToggle: any) => {
          return items.find(item => {
            return this._getItemValue(itemToToggle) === this._getItemValue(item);
          }) !== undefined;
        });

        // Take the first item for single mode.
        if (!this.isMultiple) {
          itemsToToggle.splice(0, 1);
        }
      }

      itemsToToggle.forEach((item: any) => {
        this._addSelectedItem(item);
      });
    } else {
      this._selectedItems = [];
    }

    this._setItemsToConfirm(this._selectedItems);
  }

  /**
   * Scrolls to the top of Modal content.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#scrolltotop).
   *
   * @returns Promise that resolves when scroll has been completed.
   * @memberof IonicPickComponent
   */
  scrollToTop(): Promise<any> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self._isOpened) {
        reject('IonicPick content cannot be scrolled.');
        return;
      }

      self._modalComponent._content.scrollToTop().then(() => {
        resolve(true);
      });
    });
  }

  /**
   * Scrolls to the bottom of Modal content.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#scrolltobottom).
   *
   * @returns Promise that resolves when scroll has been completed.
   * @memberof IonicPickComponent
   */
  scrollToBottom(): Promise<any> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self._isOpened) {
        reject('IonicPick content cannot be scrolled.');
        return;
      }

      self._modalComponent._content.scrollToBottom().then(() => {
        resolve(true);
      });
    });
  }

  /**
   * Starts search process by showing Loading spinner.
   * Use it together with `onSearch` event to indicate search start.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#startsearch).
   *
   * @memberof IonicPickComponent
   */
  startSearch() {
    if (!this._isEnabled) {
      return;
    }

    this.showLoading();
  }

  /**
   * Ends search process by hiding Loading spinner and refreshing items.
   * Use it together with `onSearch` event to indicate search end.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#endsearch).
   *
   * @memberof IonicPickComponent
   */
  endSearch() {
    if (!this._isEnabled) {
      return;
    }

    this.hideLoading();

    // When inside Ionic Modal and onSearch event is used,
    // ngDoCheck() doesn't work as _itemsDiffer fails to detect changes.
    // See https://github.com/ceotrammell/ionic-pick/issues/44.
    // Refresh items manually.
    this._setItems(this.items);
    this._emitOnSearchSuccessOrFail(this._hasFilteredItems);
  }

  /**
   * Enables infinite scroll.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#enableinfinitescroll).
   *
   * @memberof IonicPickComponent
   */
  enableInfiniteScroll() {
    if (!this._hasInfiniteScroll) {
      return;
    }

    this._modalComponent._infiniteScroll.disabled = false;
  }

  /**
   * Disables infinite scroll.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#disableinfinitescroll).
   *
   * @memberof IonicPickComponent
   */
  disableInfiniteScroll() {
    if (!this._hasInfiniteScroll) {
      return;
    }

    this._modalComponent._infiniteScroll.disabled = true;
  }

  /**
   * Ends infinite scroll.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#endinfinitescroll).
   *
   * @memberof IonicPickComponent
   */
  endInfiniteScroll() {
    if (!this._hasInfiniteScroll) {
      return;
    }

    this._modalComponent._infiniteScroll.complete();
    this._setItems(this.items);
  }

  /**
   * Triggers search of items.
   * **Note**: `canSearch` has to be enabled.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#search).
   *
   * @param text Text to search items by.
   * @memberof IonicPickComponent
   */
  search(text: string) {
    if (!this._isEnabled || !this._isOpened || !this.canSearch) {
      return;
    }

    this._searchText = text;
    this._setHasSearchText();
    this._filterItems();
  }

  /**
   * Shows Loading spinner.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#showloading).
   *
   * @memberof IonicPickComponent
   */
  showLoading() {
    if (!this._isEnabled) {
      return;
    }

    this._isSearching = true;
  }

  /**
   * Hides Loading spinner.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#hideloading).
   *
   * @memberof IonicPickComponent
   */
  hideLoading() {
    if (!this._isEnabled) {
      return;
    }

    this._isSearching = false;
  }

  /**
   * Shows `ionicPickAddItemTemplate`.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#showadditemtemplate).
   *
   * @memberof IonicPickComponent
   */
  showAddItemTemplate() {
    this._toggleAddItemTemplate(true);

    // Position the template only when it shous up.
    this._positionAddItemTemplate();
  }

  /**
   * Hides `ionicPickAddItemTemplate`.
   * See more on [GitHub](https://github.com/ceotrammell/ionic-pick/wiki/Documentation#hideadditemtemplate).
   *
   * @memberof IonicPickComponent
   */
  hideAddItemTemplate() {
    // Clean item to add as it's no longer needed once Add Item Modal has been closed.
    this._itemToAdd = null;
    this._toggleAddItemTemplate(false);
  }
}
