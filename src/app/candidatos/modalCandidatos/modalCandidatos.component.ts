import { Input, Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCandidatos } from '../candidatos-data';
import { CandidatosComponent } from '../candidatos.component';

@Component({
  selector: 'app-modalCandidatos',
  templateUrl: 'modalCandidatos.component.html',
  styleUrls: ['./modalCandidatos.component.scss']
})
export class ModalCandidatosComponent {
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<CandidatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalCandidatos
  ) {}


  ngOnInit(): void {
    console.log("dasda",this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


