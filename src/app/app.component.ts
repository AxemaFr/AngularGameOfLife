import { Component, ViewChild } from '@angular/core';
import { GridComponent } from './grid/grid.component';
import { Locale } from './classes/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularGameOfLife';
  localization = Locale.getLocalizations();

  @ViewChild(GridComponent, {static: false}) grid: GridComponent;
  intervalId;
  started: boolean = false;
  tableSize: number = 40;
  speed: number = 200;
  // false = end, true = rus
  local: boolean = false;

  onIterateClick(event) {
    this.grid.iterate();
  }

  onStartStopClick(event) {
    if (this.started) {
      clearInterval(this.intervalId);
      this.started = !this.started;
    } else {
      this.intervalId = setInterval(this.grid.iterate.bind(this.grid), this.speed);
      this.started = !this.started;
    }
  }

  clearGrid($event: MouseEvent) {
    console.log(this.localization);
    this.grid.clear();
  }
}
