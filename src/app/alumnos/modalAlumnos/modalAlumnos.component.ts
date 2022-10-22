import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCandidatos } from 'src/app/candidatos/candidatos-data';
import { CandidatosComponent } from 'src/app/candidatos/candidatos.component';

@Component({
  selector: 'app-modalAlumnos',
  templateUrl: './modalAlumnos.component.html',
  styleUrls: ['./modalAlumnos.component.scss']
})
export class ModalAlumnosComponent implements OnInit {
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<CandidatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalCandidatos
  ) { }

  ngOnInit() {
    console.log("data", this.data);
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
