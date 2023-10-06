import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          opacity: 0,
        })
      ),
      transition('open => out', [animate('0.7s ease-out')]),
      transition('out => open', [animate('0.7s ease-in')]),
    ]),
  ],
})
export class NavbarComponent {
  showHamburger = false;

  constructor(private renderer: Renderer2) {}

  onClick() {
    this.showHamburger = !this.showHamburger;
  }
}
