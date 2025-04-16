import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-decorator-navbar',
  templateUrl: './decorator-navbar.component.html',
  styleUrls: ['./decorator-navbar.component.css']
})
export class DecoratorNavbarComponent {
  @Output() logoutClicked = new EventEmitter<void>();

  onLogout(): void {
    this.logoutClicked.emit();
  }
}
