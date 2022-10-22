import { Component, OnInit } from '@angular/core';
import { TableRows } from '../alumnos/alumnos-data';

@Component({
  selector: 'app-reporteTotal',
  templateUrl: './reporteTotal.component.html',
  styleUrls: ['./reporteTotal.component.scss']
})
export class ReporteTotalComponent implements OnInit {

  trow:TableRows[];
  constructor() { }

  ngOnInit() {
  }

}
