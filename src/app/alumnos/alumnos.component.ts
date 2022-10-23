import { Component} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Employee, TableRows } from "./alumnos-data";
import { ModalAlumnosComponent } from "./modalAlumnos/modalAlumnos.component";

@Component({
  templateUrl: "alumnos.component.html",
})

export class AlumnosComponent {

  trow:TableRows[];
  verModalAlumno: boolean = false;
  listaAlumno: any = [];
  constructor(
    private dialog: MatDialog
  ) {
    this.trow=Employee;
  }

  ngOnInit() {

  }
  openDialogAlumno(e:string, editar:any): void {
    this.listaAlumno = {e, titulo:editar};
    this.verModalAlumno = true;
}
  abrirModalCandidato(e:any){
    this.verModalAlumno = e;
    console.log(e);
  }


}
