import { Input, Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalUsuarios } from '../usuarios-data';
import { UsuariosComponent } from '../usuarios.component';

@Component({
  selector: 'app-modalUsuarios',
  templateUrl: 'modalUsuarios.component.html',
  styleUrls: ['./modalUsuarios.component.scss']
})
export class ModalUsuariosComponent {
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<UsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalUsuarios
  ) {}


  ngOnInit(): void {
    console.log("dasda",this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  listarusuario(){

  }
}


