import { Component } from '@angular/core';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  constructor(private accountService: AccountService) {}

  get account() {
    return this.accountService.accountValue;
  }

  logout() {
    this.accountService.logout();
  }
}
