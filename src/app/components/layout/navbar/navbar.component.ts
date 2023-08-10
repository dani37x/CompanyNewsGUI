import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  mobile: boolean | undefined;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.screen.width <= 768) {
      this.mobile = true;
    }
    else{
      this.mobile = false;
    }
  }
}
