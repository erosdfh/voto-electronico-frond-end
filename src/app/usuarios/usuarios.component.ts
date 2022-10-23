

import { Input, Component, OnInit } from '@angular/core';
import { Employee, TableRows } from './usuarios-data';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalUsuariosComponent } from './modalUsuarios/modalUsuarios.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { ConfirmationService, MessageService,ConfirmEventType } from 'primeng/api';

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
  constructor(
    public dialog: MatDialog, private usuarioService:UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    ) {
    this.trow=Employee;
  }



  ngOnInit(): void {
    this.listarUsuario();
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
  let param = +(this.idUsuario ? +this.idUsuario : "")
  this.usuarioService.listarUsuario(param).subscribe(
    (result: any) => {
      this.lista = result.items;
    }, (error: HttpErrorResponse) => {
    });
  }
  confirm2() {
    console.log("eliminar");
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
        },
        reject: (type:any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
}
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}

