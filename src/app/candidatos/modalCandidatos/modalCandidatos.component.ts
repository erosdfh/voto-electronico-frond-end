import { Input, Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  formGroupParent: any =[];
  isVisible: boolean = true;
  @Input() dataItems: any = null;
  @Output() showModal= new EventEmitter<boolean>();
  constructor(
    private fb:FormBuilder
  ) {
    this.formGroupParent = this.fb.group({
      nombreApellido: new FormControl('', [ Validators.required]),
      foto: new FormControl('', [ Validators.required]),
      partidoPoli: new FormControl('', [ Validators.required]),
      logo: new FormControl('', [ Validators.required]),
      regidores : this.fb.array([])
    });
     (this.formGroupParent.controls.regidores as FormArray).push(
      this.fb.group({
        nombreApellidoRegidor: ['', Validators.required],
        cargo: ['', Validators.required],
      }));
  }


  ngOnInit() {
    console.log("modal", this.dataItems);
  }
  closeModal(){
    this.isVisible = false;
    this.showModal.emit(false);
  }
  agregarRegidor(){
    if(+(this.formGroupParent.controls.regidores as FormArray).length > 5){
      return;
    }
    (this.formGroupParent.controls.regidores as FormArray).push(
      this.fb.group({
        nombreApellidoRegidor: ['', Validators.required],
        cargo: ['', Validators.required],
      }));
  }
  eliminarR(nindex:number){
    if(+(this.formGroupParent.controls.regidores as FormArray).length > 1){
      (this.formGroupParent.controls.regidores as FormArray).removeAt(nindex);
    }
  }
}


