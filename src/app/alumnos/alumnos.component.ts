import { Component} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Employee, TableRows } from "./alumnos-data";
import { ModalAlumnosComponent } from "./modalAlumnos/modalAlumnos.component";

import { UsuarioService } from "../services/usuario.service";
import { MessageService } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";
import { RowGroupHeader } from "primeng/table";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  templateUrl: "alumnos.component.html",
  styleUrls: ['./alumnos.component.scss']
})

export class AlumnosComponent {
  trow:TableRows[];
  products : any = [];
  nameFile: string = '';
  listAlumno: any = [];
  verModalAlumno: boolean = false;
  listaAlumno:any = [];
  constructor(
    private dialog: MatDialog,
    private usuarioService:UsuarioService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) {
    this.trow=Employee;
  }

  ngOnInit() {
    this.listaralumno();
  }

  openDialog(e:string, editar:any): void {
    this.listaAlumno = {e, titulo:editar};
    console.log("111",this.listaAlumno);
    this.verModalAlumno = true;
    console.log(e);
  }
abrirModalCandidato(e:any){
  this.verModalAlumno = e;
  if(e == false){
    //this.listarCandidatos();
    //this.listaCandidatos = [];
  }else{
  }
}
  listaralumno(){
    let param : number = 0;
    this.spinner.show();
    this.usuarioService.listarAlumnos(param).subscribe(
      (result:any)=>{
        this.spinner.hide();
        if(result.items.length != 0){
          this.listAlumno = result
        }else{
          this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'No existe registros para mostrar'});
        }
        console.log(result);
      },(error: HttpErrorResponse) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar su conexion y vuelve a intentarlo'});
      });
  }

  /*onFileChange(evt: any) {
    console.log("Evento",evt);
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
      console.log("listExcel",this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }*/
  /*registrarAlumno(){
    let listExel: any = [];
    this.data.forEach((element:any) => {
      element.forEach((element1:any) => {
        listExel
        console.log(element1);
      });

    });
    let param =
    [{
      "dni":'',
      "nombresApellidos":'',
      "grado":'',
      "seccion":'',
      "idNivel":0
    }]
    return;
    this.usuarioService.registrarAlumno(param).subscribe(
      (result:any)=>{
        console.log(result);
      });
  }*/



}
