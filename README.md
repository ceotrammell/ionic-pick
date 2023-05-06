
<div  align="center">

<a  href="https://www.chartjs.org/"  target="_blank">

<h1  align="center">Ionic Pick</h1>

</a>

</div>

<p  align="center">

<a  href="https://www.npmjs.com/package/ionic-pick"><img  src="https://img.shields.io/npm/v/ionic-pick.svg"></a>

<a  href="https://www.npmjs.com/package/ionic-pick"><img  src="https://img.shields.io/npm/dm/ionic-pick.svg"></a>

</p>

  

## Installation

#### Install Package

```shell

npm i  ionic-pick

```

  

## Supported Ionic languages

- Angular Support

- Stencil Support

  

## Supported Ionic versions

  

- Ionic 7 (>=7.0.0)

  

An Ionic component similar to [ion-select](https://ionicframework.com/docs/api/select), that allows to search items, including async search, infinite scrolling and more. Ionic-pick strictly support ionic 7+. Testing below 7 has not been done. If you need to support a lower version, you must use [Ionic-Selectable](https://github.com/eakoriakin/ionic-selectable) where this package originally derived from.

  

![iOS Demo](images/demo.gif)

  

## Contents (referenced to Ionic-Selectable)

  

- [Demo](https://stackblitz.com/edit/ionic-selectable-v4-basic-usage?file=app/pages/home/home.html)

- [Features](#features)

- [Getting started](#getting-started)

- [Supported Ionic versions](#supported-ionic-versions)

- [FAQ](../../wiki#faq)

- [Docs](../../wiki)

- [Theming](../../wiki#theming)

  
  

## Features (referenced to Ionic-Selectable)

  

- [Single selection](https://stackblitz.com/edit/ionic-selectable-v4-basic-usage?file=app/pages/home/home.html)

- [Multiple selection](../../wiki#ismultiple)

- [Search items](https://stackblitz.com/edit/ionic-selectable-v4-basic-usage?file=app/pages/home/home.html)

- [Search items asynchronously](https://stackblitz.com/edit/ionic-selectable-v4-on-search-event?file=app/pages/home/home.html)

- [Search by several item fields](https://stackblitz.com/edit/ionic-selectable-v4-on-search-event?file=app/pages/home/home.html)

- [Forms](https://stackblitz.com/edit/ionic-selectable-v4-form-control?file=app/pages/home/home.html)

- [InfiniteScroll](https://stackblitz.com/edit/ionic-selectable-v4-infinite-scroll?file=app/pages/home/home.html)

- [VirtualScroll](https://stackblitz.com/edit/ionic-selectable-v4-virtual-scroll?file=app/pages/home/home.html)

- [Templates](../../wiki#templates)

- [Grouping items](../..//wiki#grouping)

- [Editing, adding and deleting items](../../wiki#editing)

- [Disabling items](../../wiki#disableditems)

  

## Getting started (referenced to Ionic-Selectable)

  

1. Install it.

  
  

Ionic 3

```

npm install ionic-selectable@3.5.0 --save

```

Ionic 4 - Ionic 6

```

npm install ionic-selectable@4.8.0 --save

```

Ionic 7+

```

npm install ionic-pick@1.0.4 --save

```

  
  

2. Import it.

- (Ionic 3-6) First, import `IonicSelectableModule` to your `app.module.ts` that is normally located in `src\app\app.module.ts`.
- (Ionic 7+) First, import `IonicPickAngularModule` to your `app.module.ts` that is normally located in `src\app\app.module.ts`.
  

```

import { IonicSelectableModule } from 'ionic-selectable'; //Ionic 3-6
import { IonicPickAngularModule } from 'ionic-pick'; //Ionic 7+
  

@NgModule({

imports: [

IonicSelectableModule //Ionic 3-6
IonicPickAngularModule //Ionic 7+
]

})

export class AppModule { }

  

```

  

**Note:** Additionally, if you use Ionic 3+ you might be as well using lazy loaded pages. Check if your pages have a module file, for example, `home.module.ts`, and if they do then import `IonicSelectableModule` to each page module too.

  

```

import { IonicSelectableModule } from 'ionic-selectable'; //Ionic 3-6
import { IonicPickAngularModule } from 'ionic-pick'; //Ionic 7+

import { HomePage } from './home';

  

@NgModule({

declarations: [

HomePage

],

imports: [

IonicPageModule.forChild(HomePage),

IonicSelectableModule //Ionic 3-6
IonicPickAngularModule //Ionic 7+

]

})

export class HomePageModule { }

  

```

  

3. Add it to template.

  

```

<ion-item>

<ion-label>Port</ion-label>
<!--Ionic 3-6-->
<ionic-selectable

item-content // Required for Ionic 3 only.

[(ngModel)]="port"

[items]="ports"

itemValueField="id"

itemTextField="name"

[canSearch]="true"

(onChange)="portChange($event)">

</ionic-selectable>

<!--Ionic 7+-->
<ionic-pick

item-content // Required for Ionic 3 only.

[(ngModel)]="port"

[items]="ports"

itemValueField="id"

itemTextField="name"

[canSearch]="true"

(onChange)="portChange($event)">

</ionic-pick>

</ion-item>

```

  

4. Configure it.

  

```

import { IonicSelectableComponent } from 'ionic-selectable'; //Ionic 3-6
import { IonicPickAngularModule } from 'ionic-pick'; //Ionic 7+
  

class Port {

public id: number;

public name: string;

}

  

@Component({ ... })

export class HomePage {

ports: Port[];

port: Port;

  

constructor() {

this.ports = [

{ id: 1, name: 'Tokai' },

{ id: 2, name: 'Vladivostok' },

{ id: 3, name: 'Navlakhi' }

];

}

  

portChange(event: {

component: IonicSelectableComponent, //Ionic 3-6
component: IonicPickAngularModule , //Ionic 7+
value: any

}) {

console.log('port:', event.value);

}

}

```

  

[Sponsor creator of derived ionic-selectable package here](https://opencollective.com/ionic-selectable)