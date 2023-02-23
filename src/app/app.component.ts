import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalActions } from './+state/global.actions';
import { selectSideNavStatus } from './+state/global.selectors';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sideNavStatus$ = this.store.select(selectSideNavStatus);
  constructor(private store: Store) {}

  closeSidenav(): void {
    this.store.dispatch(GlobalActions.toggleDetailSidenav());
  }
}
