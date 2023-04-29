import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private didThemeChange  = new BehaviorSubject(false);

  // Sets
  setdidThemeChange(x: boolean) {
    const didThemeChange = x;
    this.didThemeChange.next(didThemeChange);
  };

  // Gets
  getdidThemeChange(): Observable<any> {
    let get = combineLatest(
        this.didThemeChange);
        return get;
  };
  
}
