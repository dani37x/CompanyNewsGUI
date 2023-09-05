import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showHamburger = false;

  constructor(private renderer: Renderer2) {}

  onClick() {
    this.showHamburger = !this.showHamburger;
  }
}
