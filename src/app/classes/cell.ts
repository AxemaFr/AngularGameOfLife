export class Cell {
  public isAlive: boolean;
  x: number;
  y: number;

  constructor(x, y) {
   this.x = x;
   this.y = y;
   this.isAlive = false;
  }

  toggle() {
    this.isAlive = !this.isAlive;
  }

  randomizeState() {
    this.isAlive = Math.floor(Math.random() * Math.floor(3)) === 1;
  }
}
