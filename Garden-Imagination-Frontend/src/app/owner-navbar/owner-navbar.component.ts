import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-owner-navbar',
  templateUrl: './owner-navbar.component.html',
  styleUrls: ['./owner-navbar.component.css']
})
export class OwnerNavbarComponent {
  @Output() logoutClicked = new EventEmitter<void>();

  onLogout() {
    this.logoutClicked.emit();
  }
}
