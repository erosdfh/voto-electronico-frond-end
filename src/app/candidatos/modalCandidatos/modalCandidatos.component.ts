import { Input, Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
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
  resultadoGuardadoActualizado: any = [];
  verBotonEliminarAgregar:boolean = false;
  @Input() dataItems: any = null;
  @Output() showModal= new EventEmitter<boolean>();
  constructor(
    private fb:FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
  ) {
    this.formGroupParent = this.fb.group({
      nombreApellido: new FormControl('', [ Validators.required]),
      foto: new FormControl('', [ Validators.required]),
      partidoPoli: new FormControl('', [ Validators.required]),
      logo: new FormControl('', [ Validators.required]),
      observacion: new FormControl(''),
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
      this.formGroupParent.controls.observacion.setValue(this.dataItems.e.observacion);
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
        observacion: new FormControl(''),
        regidores : this.fb.array([])
      });
       (this.formGroupParent.controls.regidores as FormArray).push(
        this.fb.group({
          nombreApellidoRegidor: ['', Validators.required],
          cargo: ['', Validators.required],
        }));
    }else if (this.dataItems.titulo == 'Ver'){
      this.verBotonEliminarAgregar = true;
      this.formGroupParent = this.fb.group({
        nombreApellido: new FormControl({value: this.dataItems.e.candidato, disabled : true}),
        foto: new FormControl({value: this.dataItems.e.image, disabled : true}),
        partidoPoli: new FormControl({value: this.dataItems.e.partidoPolitico, disabled : true}),
        logo: new FormControl({value: this.dataItems.e.logo, disabled : true}),
        observacion: new FormControl({value: this.dataItems.e.observacion, disabled : true}),
        regidores : this.fb.array([])
      });
      this.dataItems.e.regidor.forEach((element:any) => {
        (this.formGroupParent.controls.regidores as FormArray).push(
          this.fb.group({
            nombreApellidoRegidor: [{value: element.regidor, disabled: true}],
            cargo: [{value:element.cargo, disabled: true}]
          }));
      });
    }
  }
  closeModal(){
    this.isVisible = false;
    console.log(this.resultadoGuardadoActualizado);
      this.showModal.emit(false);
  }
  registrarCandidato(){
    let lisRegidores:any = [];
    console.log(this.formGroupParent);
    this.formGroupParent.markAllAsTouched();
    if(this.formGroupParent.invalid){
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Debe ingresar documento'});
      console.log("formgroup", this.formGroupParent);
      return;
    }
    (this.formGroupParent.get('regidores')['controls']).forEach((element:any) => {
      console.log("aaaa",element.value?.cargo);
      lisRegidores.push({
        "regidor": ""+element.value?.nombreApellidoRegidor,
        "cargo": ""+element.value?.cargo
      });
    });
    let param = {
      "candidato": ""+this.formGroupParent.value?.nombreApellido,
      "image": ""+this.formGroupParent.value?.foto.name,
      "partidoPolitico": ""+this.formGroupParent.value?.partidoPoli,
      "logo": ""+this.formGroupParent.value?.logo.name,
      "observacion": ""+this.formGroupParent.value?.observacion,
      "regidor": lisRegidores
    }
    console.log(param);
    this.usuarioService.registrarCandidato(param).subscribe(
      (result:any)=>{
        if(result.body.status == true){
        this.resultadoGuardadoActualizado = result.body.status
        console.log(result);
        this.closeModal();
        }
      });
  }
  accion(){
    if(this.dataItems.titulo == 'Editar'){
      this.actualizarCandidato();
      console.log(this.dataItems.titulo);
    }else if (this.dataItems.titulo == 'Nuevo'){
      this.registrarCandidato();
    }

  }
  actualizarCandidato(){
    console.log("foto",this.formGroupParent.value?.foto);
    this.formGroupParent.markAllAsTouched();
    if(this.formGroupParent.invalid){
      return;
    }
    console.log("aqui");
    let listRegidoresActualizar:any = [];
    console.log(this.formGroupParent);
    (this.formGroupParent.get('regidores')['controls']).forEach((element:any) => {
      console.log("aaaa",element.value?.cargo);
      listRegidoresActualizar.push({
        "regidor": ""+element.value?.nombreApellidoRegidor,
        "cargo": ""+element.value?.cargo,
        "idRegidor": element.value?.id || 0
      });
    });
    let param = {
        "idCandidato": this.dataItems.e.idCandidato,
        "candidato": ""+this.formGroupParent.value?.nombreApellido,
        "image": ""+this.formGroupParent.value?.foto.name,
        "partidoPolitico": ""+this.formGroupParent.value?.partidoPoli,
        "logo": ""+this.formGroupParent.value?.logo.name,
        "observacion": ""+this.formGroupParent.value?.observacion,
        "regidor": listRegidoresActualizar
      }
      console.log(param);
      this.usuarioService.actualizarCandidato(param).subscribe(
        (result:any)=>{
          if(result.body.status == true){
            this.resultadoGuardadoActualizado = result.body.status
            this.closeModal();
            console.log("resul", result);
          }
        });
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


