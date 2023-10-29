import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-modalm',
  templateUrl: './modalm.component.html'
})

export class ModalmComponent {

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
  public onContainerClicked(event: MouseEvent): void {

    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  public onContainerClose(event: any): void {

    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}

