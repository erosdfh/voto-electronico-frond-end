import { Input, Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  index:number = 0;
  isVisible: boolean = true;
  @Input() dataItems: any = null;
  @Output() showModal= new EventEmitter<boolean>();
  constructor(
    private fb:FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.formGroupParent = this.fb.group({
      nombreApellido: new FormControl('', [ Validators.required]),
      foto: new FormControl('', [ Validators.required]),
      partidoPoli: new FormControl('', [ Validators.required]),
      logo: new FormControl('', [ Validators.required]),
      regidores : this.fb.array([])
    });
  }
  ngOnInit() {
    console.log("modal", this.dataItems);
    if(this.dataItems.titulo == 'Editar'){
      this.formGroupParent.controls.nombreApellido.setValue(this.dataItems.e.candidato);
      this.formGroupParent.controls.foto.setValue(this.dataItems.e.image);
      this.formGroupParent.controls.partidoPoli.setValue(this.dataItems.e.partidoPolitico);
      this.formGroupParent.controls.logo.setValue(this.dataItems.e.logo);
      this.dataItems.e.regidor.forEach((element:any) => {
      (this.formGroupParent.controls.regidores as FormArray).push(
        this.fb.group({
          nombreApellidoRegidor: [element.regidor, Validators.required],
          cargo: [element.cargo, Validators.required],
          id: [element.idRegidor]
        }));
    });
    }else if(this.dataItems.titulo == 'Nuevo'){
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
  }
  closeModal(){
    this.isVisible = false;
    this.showModal.emit(false);
  }
  registrarCandidato(){
    let lisRegidores:any = [];
    console.log(this.formGroupParent);
    (this.formGroupParent.get('regidores')['controls']).forEach((element:any) => {
      console.log("aaaa",element.value?.cargo);
      lisRegidores.push({
        "regidor": ""+element.value?.nombreApellidoRegidor,
        "cargo": ""+element.value?.cargo
      });
    });
    let param = {
      "candidato": ""+this.formGroupParent.value?.nombreApellido,
      "image": ""+this.formGroupParent.value?.foto,
      "partidoPolitico": ""+this.formGroupParent.value?.partidoPoli,
      "logo": ""+this.formGroupParent.value?.logo,
      "regidor": lisRegidores
    }
    console.log(param);
    this.usuarioService.registrarCandidato(param).subscribe(
      (result:any)=>{
        console.log(result);
      });
  }

  actualizarCandidato(){

    let param = {
        "idCandidato": 3,
                  "candidato": "lucas pol",
                  "image": "/srct",
                  "partidoPolitico": "Partido aquiario",
                  "logo": "/asdas",
                  "regidor": [
                      {
                          "idRegidor": 6,
                          "regidor": "paisano paisha",
                          "cargo": "regidor de las gardenias"
                      }
                  ]
      }
      this.usuarioService.actualizarCandidato(param).subscribe(
        (result:any)=>{
          console.log(result);
        }
      );
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


