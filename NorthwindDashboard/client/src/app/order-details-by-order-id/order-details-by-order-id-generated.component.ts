/*
  This file is automatically generated. Any changes will be overwritten.
  Modify order-details-by-order-id.component.ts instead.
*/
import { ChangeDetectorRef, ViewChild, AfterViewInit, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { DialogService, DIALOG_PARAMETERS, DialogRef } from '@radzen/angular/dist/dialog';
import { NotificationService } from '@radzen/angular/dist/notification';
import { ContentComponent } from '@radzen/angular/dist/content';
import { HeadingComponent } from '@radzen/angular/dist/heading';
import { GridComponent } from '@radzen/angular/dist/grid';
import { AddOrderDetailComponent } from '../add-order-detail/add-order-detail.component';
import { EditOrderDetailComponent } from '../edit-order-detail/edit-order-detail.component';

import { NorthwindService } from '../northwind.service';
import { SecurityService } from '../security.service';

export class OrderDetailsByOrderIdGenerated implements AfterViewInit, OnInit, OnDestroy {
  // Components
  @ViewChild('content1') content1: ContentComponent;
  @ViewChild('pageTitle') pageTitle: HeadingComponent;
  @ViewChild('grid0') grid0: GridComponent;

  router: Router;

  cd: ChangeDetectorRef;

  route: ActivatedRoute;

  notificationService: NotificationService;

  dialogService: DialogService;

  dialogRef: DialogRef;

  _location: Location;

  _subscription: Subscription;

  northwind: NorthwindService;

  security: SecurityService;

  getNorthwindOrderDetailsResult: any;

  getNorthwindOrderDetailsCount: any;

  parameters: any;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.notificationService = this.injector.get(NotificationService);

    this.dialogService = this.injector.get(DialogService);

    this.dialogRef = this.injector.get(DialogRef, null);

    this.router = this.injector.get(Router);

    this.cd = this.injector.get(ChangeDetectorRef);

    this._location = this.injector.get(Location);

    this.route = this.injector.get(ActivatedRoute);

    this.northwind = this.injector.get(NorthwindService);
    this.security = this.injector.get(SecurityService);
  }

  ngAfterViewInit() {
    this._subscription = this.route.params.subscribe(parameters => {
      if (this.dialogRef) {
        this.parameters = this.injector.get(DIALOG_PARAMETERS);
      } else {
        this.parameters = parameters;
      }
      this.load();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }


  load() {
    this.northwind.getNorthwindOrderDetails(`OrderID eq ${this.parameters.OrderID}`, this.grid0.allowPaging ? this.grid0.pageSize : null, this.grid0.allowPaging ? 0 : null, null, `NorthwindOrder,NorthwindProduct`, this.grid0.allowPaging, null, null)
    .subscribe((result: any) => {
      this.getNorthwindOrderDetailsResult = result.value;

      this.getNorthwindOrderDetailsCount = this.grid0.allowPaging ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });
  }

  grid0Add(event: any) {
    this.dialogService.open(AddOrderDetailComponent, { parameters: {}, title: 'Add Order Detail' });
  }

  grid0Delete(event: any) {
    this.northwind.deleteNorthwindOrderDetail(event.OrderID, event.ProductID)
    .subscribe((result: any) => {
      this.notificationService.notify({ severity: "success", summary: `Success`, detail: `NorthwindOrderDetail deleted!` });
    }, (result: any) => {
      this.notificationService.notify({ severity: "error", summary: `Error`, detail: `Unable to delete NorthwindOrderDetail` });
    });
  }

  grid0LoadData(event: any) {
    this.northwind.getNorthwindOrderDetails(`${event.filter ? event.filter + ' and ' : ''}OrderID eq ${this.parameters.OrderID}`, event.top, event.skip, `${event.orderby}`, `NorthwindOrder,NorthwindProduct`, event.top != null && event.skip != null, null, null)
    .subscribe((result: any) => {
      this.getNorthwindOrderDetailsResult = result.value;

      this.getNorthwindOrderDetailsCount = event.top != null && event.skip != null ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });
  }

  grid0RowSelect(event: any) {
    this.dialogService.open(EditOrderDetailComponent, { parameters: {OrderID: event.OrderID, ProductID: event.ProductID}, title: 'Edit Order Detail' });
  }
}
