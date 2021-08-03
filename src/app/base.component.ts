import { Component, Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseComponent implements OnDestroy {
  protected unsubscribe: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
