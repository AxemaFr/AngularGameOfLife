import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Cell} from '../classes/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  tableSize: number = 8;

  cellsFlat: Array<Cell> = [];
  rowsIterable: Array<number> = [];

  constructor() {
    for (let i = 0; i < this.tableSize; i++) {
      this.rowsIterable.push(i);
      for (let j = 0; j < this.tableSize; j++) {
        this.cellsFlat[this.flatMask(i, j)] = new Cell(i, j);
      }
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onCellClick(i: number, j: number) {
    this.cellsFlat[this.flatMask(i, j)].toggle();
  }

  flatMask(i: number, j: number) {
    return i * this.tableSize + j;
  }

  getRow(row: number): Array<Cell> {
    let result: Array<Cell> = [];
    for (let i = 0; i < this.tableSize; i++) {
      result.push(this.cellsFlat[this.flatMask(row, i)]);
    }
    return result;
  }
}
