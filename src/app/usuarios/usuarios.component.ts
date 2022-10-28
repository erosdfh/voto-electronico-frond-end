

import { Input, Component, OnInit } from '@angular/core';
import { Employee, TableRows } from './usuarios-data';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalUsuariosComponent } from './modalUsuarios/modalUsuarios.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { ConfirmationService, MessageService,ConfirmEventType, PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styles: [`
    .alert-custom {
      color: #cc4dd5;
      background-color: #f0c4f3;
      border-color: #f0c4f3;
    }
  `],
   providers: [ConfirmationService,MessageService]
})
export class UsuariosComponent implements OnInit {
  // this is for the Closeable Alert
  lista:any;
  idUsuario: string = "";
  @Input() public alerts: Array<IAlert> = [];
  trow:TableRows[];
  listeditarUsuario: any = [];
  verModalUsuario: boolean = false;
  msgs:any = [];
  constructor(
    public dialog: MatDialog, private usuarioService:UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private spinner: NgxSpinnerService
    ) {
    this.trow=Employee;
  }



  ngOnInit(): void {
    this.listarUsuario();
    this.primengConfig.ripple = true;
  }
  abrirModalEditarUsuario(e:any){
    this.verModalUsuario = e;
    console.log("111",e);
    this.listeditarUsuario = [];
    this.listarUsuario();
  }

  openDialog(e:any, editar:string): void {
    this.listeditarUsuario = {e, titulo:editar}  ;
    this.verModalUsuario = true;
  }

buscarUsuario(e:any){
  if(e.key == "Enter"){
    this.listarUsuario();
  }
}
listarUsuario(){
  this.spinner.show();
  let param = +(this.idUsuario ? +this.idUsuario : "")
  this.spinner.show();
  this.usuarioService.listarUsuario(param).subscribe(
    (result: any) => {
      this.spinner.hide();
      if(result.items.length != 0){
        this.lista = result.items;
        this.spinner.hide();
      }else{
        this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'No existe registros para mostrar'});
        this.spinner.hide();
      }
    },(error: HttpErrorResponse) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar su conexion y vuelve a intentarlo'});
      this.spinner.hide();
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
              this.eliminar(e);
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            },
            key: "positionDialog"
        });
    }
    eliminar(e:any){
      this.spinner.show();
      this.usuarioService.elimarUsuario(e.idUsers).subscribe(
        (result:any)=>{
          if(result.body.status == true){
            this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'El registro de elimino de forma correcta'});
            this.listarUsuario();
            this.spinner.hide();
          }
        }, (error: HttpErrorResponse) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar su conexion y vuelve a intentarlo'});
          this.spinner.hide();
        });


    }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}

