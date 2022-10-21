

import { Input, Component, OnInit } from '@angular/core';
import { Employee, TableRows } from './usuarios-data';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalUsuariosComponent } from './modalUsuarios/modalUsuarios.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styles: [`
    .alert-custom {
      color: #cc4dd5;
      background-color: #f0c4f3;
      border-color: #f0c4f3;
    }
  `]
})
export class UsuariosComponent implements OnInit {
  // this is for the Closeable Alert
  lista:any;
  @Input() public alerts: Array<IAlert> = [];
  trow:TableRows[];
  constructor( public dialog: MatDialog, private usuarioService:UsuarioService) {
    this.trow=Employee;
  }



  ngOnInit(): void {
    this.listarUsuario();
  }

  openDialog(e:string): void {
    const dialogRef = this.dialog.open(ModalUsuariosComponent, {
      width: '500px',
      disableClose:true,
      data: {titulo:e},
    });
}

listarUsuario(){
  this.usuarioService.listarUsuario().subscribe((result: any) => {
    this.lista = result.dato;
    console.log(this.lista);
}, (error: HttpErrorResponse) => {
});
}
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}

