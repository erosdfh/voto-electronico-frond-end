import { Component} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Employee, TableRows } from "./alumnos-data";
import { ModalAlumnosComponent } from "./modalAlumnos/modalAlumnos.component";

import { UsuarioService } from "../services/usuario.service";
import { ConfirmationService, MessageService } from "primeng/api";
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
  msgs:any = [];
  constructor(
    private dialog: MatDialog,
    private usuarioService:UsuarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
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
    console.log("ee",e);
  }
abrirModalCandidato(e:any){
  console.log("5555",e);
  if(e == false){
    this.verModalAlumno = false;
  }else if(e.listRes.body.status == true){
    if(e.titulo == 'E'){
      this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'Se actualizó de forma correcta'});
    }else if(e.titulo == 'N'){
      this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'Se registro de forma correcta'});
    }
    this.verModalAlumno = false;
  }else if (e.listRes.body.status == false){
    this.verModalAlumno = false;
  }
  //this.verModalAlumno = e;
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

  confimacionEliminarDialog(e:any) {
    this.confirmationService.confirm({
        message: '¿Esta seguro de eliminar el registro?',
        header: 'Confirmación Eliminar ',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.eliminarAlumno(e);
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        },
        key: "positionDialog"
    });
  }
  eliminarAlumno(e:any){
    this.spinner.show();
    this.usuarioService.eliminarAlumno(e.idalumno).subscribe(
      (result:any)=>{
        if(result.body.status == true){
          this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'Se elimino de forma correcta'});
          this.listaralumno();
          this.spinner.hide();
        }else{
          this.spinner.hide();
        }
      }, (error: HttpErrorResponse) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar su conexion y vuelve a intentarlo'});
        this.spinner.hide();
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
