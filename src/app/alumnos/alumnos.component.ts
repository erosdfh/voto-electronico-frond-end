import { Component} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Employee, TableRows } from "./alumnos-data";
import { ModalAlumnosComponent } from "./modalAlumnos/modalAlumnos.component";
import * as XLXS from 'xlsx';
@Component({
  templateUrl: "alumnos.component.html",
})

export class AlumnosComponent {
  data:any;
  trow:TableRows[];
  products : any = [];
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

  onFileChange(evt: any) {
    console.log("dasd",evt);
    const target : DataTransfer =  <DataTransfer>(evt.target);
    console.log("file",target);
    //if (target.files.length !== 1) throw new Error('no se puede seleccionar varios archivos');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLXS.WorkBook = XLXS.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLXS.WorkSheet = wb.Sheets[wsname];

      this.data = (XLXS.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);


    };

    reader.readAsBinaryString(target.files[0]);

  }
}
