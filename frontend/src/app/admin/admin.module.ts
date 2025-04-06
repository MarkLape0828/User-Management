import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHomeComponent,
    ManageAccountsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class AdminModule { }
