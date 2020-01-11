import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Cell} from '../classes/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  tableSize: Number = 10;

  rowsIterable: Array<number> = [];
  table: Object = Array(this.tableSize).fill(0).map(x => Array(this.tableSize).fill(0));


  constructor() {
    for (let i = 0; i < this.tableSize; i++) {
      this.rowsIterable.push(i);
      for (let j = 0; j < this.tableSize; j++) {
        this.table[i][j] = new Cell(i, j);
      }
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.table);
  }

  onCellClick(i: number, j: number) {

  }

  isCellAlive(i: number, j: number) {
    this.table[i][j].
  }
}
