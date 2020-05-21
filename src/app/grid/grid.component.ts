import {AfterViewInit, Component, Host, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {Cell} from '../classes/cell';
import {SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() gridSize: number = 5;

  cellsFlat: Array<Cell> = [];
  rowsIterable: Array<number> = [];
  paintMode: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gridSize) {
      this.refreshGrid();
    }
  }

  ngAfterViewInit() {
  }

  onCellClick(i: number, j: number) {
    this.cellsFlat[this.flatMask(i, j)].toggle();
  }

  refreshGrid() {
    this.rowsIterable = [];
    this.cellsFlat = [];

    for (let i = 0; i < this.gridSize; i++) {
      this.rowsIterable.push(i);
      for (let j = 0; j < this.gridSize; j++) {
        this.cellsFlat[this.flatMask(i, j)] = new Cell(i, j);
      }
    }
  }

  flatMask(row: number, col: number) {
    if ((row < 0) || (col < 0)) {
      return -1;
    }
    if ((row > this.gridSize - 1) || (col > this.gridSize - 1)) {
      return -1;
    }
    return row * this.gridSize + col;
  }

  getRow(row: number): Array<Cell> {
    if ((row < 0) && (row > this.gridSize - 1)) {
      return null;
    }
    let result: Array<Cell> = [];
    for (let i = 0; i < this.gridSize; i++) {
      result.push(this.cellsFlat[this.flatMask(row, i)]);
    }
    return result;
  }

  iterate() {
    let newCells: Array<Cell> = [];

    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        let newCell = new Cell(i, j);
        newCell.isAlive = this.cellCycle(this.cellsFlat[this.flatMask(i, j)]);
        newCells.push(newCell);
      }
    }
    this.cellsFlat = newCells;
  }

  cellCycle(cell: Cell): boolean {
    let neighbors: Array<Cell> = this.getNeighborhood(cell);
    let neighborsCount = neighbors.reduce(function(sum, current) {
      return current ? current.isAlive ? sum + 1 : sum : sum;
    }, 0);
    if (cell.isAlive) {
      return (neighborsCount === 2) || (neighborsCount === 3);
    } else {
      return neighborsCount === 3;
    }

  }

  clear() {
    this.cellsFlat.forEach(item => {
      item.isAlive = false;
    })
  }

  getNeighborhood(cell: Cell): Array<Cell> {
    let x = cell.x;
    let y = cell.y;
    return [
      this.cellsFlat[this.flatMask(x - 1, y - 1)],
      this.cellsFlat[this.flatMask(x - 1, y)],
      this.cellsFlat[this.flatMask(x - 1, y + 1)],

      this.cellsFlat[this.flatMask(x, y - 1)],
      this.cellsFlat[this.flatMask(x, y + 1)],

      this.cellsFlat[this.flatMask(x + 1, y - 1)],
      this.cellsFlat[this.flatMask(x + 1, y)],
      this.cellsFlat[this.flatMask(x + 1, y + 1)]
    ];
  }

  randomize() {
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.cellsFlat[this.flatMask(i, j)].randomizeState();
      }
    }
  }

  @HostListener('document:mousedown', ['$event'])
  handleKeydownEvent(event: MouseEvent) {
    this.paintMode = true;
  }

  @HostListener('document:mouseup', ['$event'])
  handleKeyupEvent(event: MouseEvent) {
    this.paintMode = false;
  }

  onGridMouseMove($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    if (this.paintMode) {
      const target: any = $event.target;
      if (!this.cellsFlat[target.dataset.celluid].isAlive) {
        this.cellsFlat[target.dataset.celluid].toggle();
      }
    }
  }

}
