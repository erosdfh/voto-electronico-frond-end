import { Input, Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
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
  isVisible: boolean = true;
  @Input() dataItems: any = null;
  @Output() showModal= new EventEmitter<boolean>();
  constructor(
  ) {}


  ngOnInit() {
    console.log("modal", this.dataItems);
  }
  closeModal(){
    this.isVisible = false;
    this.showModal.emit(false);
  }
}


