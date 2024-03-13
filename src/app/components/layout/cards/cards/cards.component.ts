import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  classElementsPositions: Array<string> = ['container__side_panel-left', 'container__center_panel', 'container__side_panel-right']

  constructor(private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef) {

  }

  onMouseEnterPanel(event: Event, className: string): void {
    if (className === 'container__side_panel-right') {
      const element = this.el.nativeElement.querySelector('.container__side_panel-right');
      this.renderer.addClass(element, 'container__side_panel-right-enter')

    }
    else if (className === 'container__side_panel-left') {
      const element = this.el.nativeElement.querySelector('.container__side_panel-left');
      this.renderer.addClass(element, 'container__side_panel-left-enter')
    }

  }
  onMouseLeavePanel(event: Event, className: string): void {
    if (className === 'container__side_panel-right') {
      const element = this.el.nativeElement.querySelector('.container__side_panel-right-enter');
      this.renderer.removeClass(element, 'container__side_panel-right-enter');

    }
    else if (className === 'container__side_panel-left') {
      const element = this.el.nativeElement.querySelector('.container__side_panel-left-enter');
      this.renderer.removeClass(element, 'container__side_panel-left-enter')
    }
  }
  onClickPanel(event: Event, className: string): void {
    if (className === 'container__side_panel-left') {
      [this.classElementsPositions[0], this.classElementsPositions[1], this.classElementsPositions[2]]
        = [this.classElementsPositions[1], this.classElementsPositions[2], this.classElementsPositions[0]]
    }
    else if (className === 'container__side_panel-right') {
      [this.classElementsPositions[0], this.classElementsPositions[1], this.classElementsPositions[2]]
        = [this.classElementsPositions[2], this.classElementsPositions[0], this.classElementsPositions[1]]
    }
    this.cdr.detectChanges();
  }
}
