import { Component} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Employee, TableRows } from "./alumnos-data";
import { ModalAlumnosComponent } from "./modalAlumnos/modalAlumnos.component";

@Component({
  templateUrl: "alumnos.component.html",
})

export class AlumnosComponent {

  trow:TableRows[];

  constructor(
    private dialog: MatDialog
  ) {
    this.trow=Employee;
  }

  ngOnInit() {

  }
  openDialogAlumno(e:string): void {
    const dialogRef = this.dialog.open(ModalAlumnosComponent, {
      width: '500px',
      disableClose:true,
      data: {titulo:e},
    })
  }
}
