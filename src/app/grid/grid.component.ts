import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Cell} from '../classes/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() tableSize: number = 5;

  intervalId;
  cellsFlat: Array<Cell> = [];
  rowsIterable: Array<number> = [];
  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < this.tableSize; i++) {
      this.rowsIterable.push(i);
      for (let j = 0; j < this.tableSize; j++) {
        this.cellsFlat[this.flatMask(i, j)] = new Cell(i, j);
      }
    }
  }

  ngAfterViewInit() {
  }

  onCellClick(i: number, j: number) {
    this.cellsFlat[this.flatMask(i, j)].toggle();
  }

  flatMask(row: number, col: number) {
    if ((row < 0) || (col < 0)) {
      return -1;
    }
    if ((row > this.tableSize - 1) || (col > this.tableSize - 1)) {
      return -1;
    }
    return row * this.tableSize + col;
  }

  getRow(row: number): Array<Cell> {
    if ((row < 0) && (row > this.tableSize - 1)) {
      return null;
    }
    let result: Array<Cell> = [];
    for (let i = 0; i < this.tableSize; i++) {
      result.push(this.cellsFlat[this.flatMask(row, i)]);
    }
    return result;
  }

  iterate() {
    let newCells: Array<Cell> = [];

    for (let i = 0; i < this.tableSize; i++) {
      for (let j = 0; j < this.tableSize; j++) {
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
}
