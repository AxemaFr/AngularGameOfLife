export class Cell {
  public isAlive: boolean;
  x: number;
  y: number;

  constructor(x, y) {
   this.x = x;
   this.y = y;
  }

  toggle() {
    this.isAlive = !this.isAlive;
  }

}
