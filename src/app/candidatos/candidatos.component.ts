import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Product,TopSelling, TableRows, Employee} from './candidatos-data';
import { ModalCandidatosComponent } from './modalCandidatos/modalCandidatos.component';


@Component({
    selector: 'app-candidatos',
    templateUrl: 'candidatos.component.html'
})
export class CandidatosComponent {
  topSelling:Product[];

  trow:TableRows[];
page = 1;
page2 = 1;
currentPage = 3;
disablepage = 3;
pagecustom = 4;
customers: any[];
loading: boolean = true;
activityValues: number[] = [0, 100];
getPageSymbol(current: number) {
return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
}
  constructor(public dialog: MatDialog) {

    this.topSelling=TopSelling;

    this.trow=Employee;
  }

  openDialog(e:string): void {
    const dialogRef = this.dialog.open(ModalCandidatosComponent, {
      width: '500px',
      disableClose:true,
      data: {titulo:e},
    });
}
}
