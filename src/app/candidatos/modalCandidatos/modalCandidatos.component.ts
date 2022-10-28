import { HttpErrorResponse } from '@angular/common/http';
import { Input, Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
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
  titulo: any = [];
  archivos: any = [];
  archivos1: any = [];
  previsualizacionFoto: String = '';
  previsualizacionLogo: String = '';

  @Input() dataItems: any = null;
  @Output() showModal= new EventEmitter<boolean>();
  constructor(
    private fb:FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private sanitezer: DomSanitizer,
    private spinner: NgxSpinnerService
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
    this.titulo = this.dataItems.titulo;
    console.log("modal", this.dataItems);
    if(this.dataItems.titulo == 'Editar'){
      this.formGroupParent.controls.nombreApellido.setValue(this.dataItems.e.candidato);
      //this.formGroupParent.controls.foto.setValue(1);
      this.previsualizacionLogo = this.dataItems.e.logo;
      this.formGroupParent.controls.partidoPoli.setValue(this.dataItems.e.partidoPolitico);
      //this.formGroupParent.controls.logo.setValue('img');
      this.previsualizacionFoto = this.dataItems.e.image;
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
        //foto: new FormControl({value: this.dataItems.e.image, disabled : true}),
        partidoPoli: new FormControl({value: this.dataItems.e.partidoPolitico, disabled : true}),
        //logo: new FormControl({value: this.dataItems.e.logo, disabled : true}),
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

   /*capturarImagens(event:any) {
    let asss : any = '';
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("aqui",reader);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log("asd",reader.result);
      asss = reader.result
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    this.archivos = asss
    console.log("1225555",this.archivos);
 }*/

 capturarLogo(event:any){
  console.log(event);
  let archivoCapturadoLogo = event.target.files[0];
  this.archivos1.push(archivoCapturadoLogo);
  this.extraerbase64(archivoCapturadoLogo).then((imagen:any) =>{
    this.previsualizacionLogo = imagen.base;
    console.log("logo",imagen);
  });
 }
 capturarFoto(event:any){
  console.log(this.formGroupParent.value?.foto);
    let archivoCapturadoFoto = event.target.files[0];
    this.archivos.push(archivoCapturadoFoto);
    this.extraerbase64(archivoCapturadoFoto).then((imagen:any) =>{
      this.previsualizacionFoto = imagen.base;
      console.log("foto",imagen);
    });
    //console.log("foto",event.target.files);
  }
  extraerbase64 = async ($event: any) => new Promise ((resolve, reject) =>{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitezer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader;
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        })
      }
  })

  closeModal(){
    this.isVisible = false;
    console.log(this.resultadoGuardadoActualizado);
      this.showModal.emit(false);
      this.previsualizacionFoto = '';
      this.previsualizacionLogo = '';
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
    this.spinner.show();
    (this.formGroupParent.get('regidores')['controls']).forEach((element:any) => {
      console.log("aaaa",element.value?.cargo);
      lisRegidores.push({
        "regidor": ""+element.value?.nombreApellidoRegidor,
        "cargo": ""+element.value?.cargo
      });
    });
    let param = {
      "candidato": ""+this.formGroupParent.value?.nombreApellido,
      "image": ""+this.previsualizacionFoto,
      "partidoPolitico": ""+this.formGroupParent.value?.partidoPoli,
      "logo": ""+this.previsualizacionLogo,
      "observacion": ""+this.formGroupParent.value?.observacion,
      "regidor": lisRegidores
    }
    console.log(param);
    this.usuarioService.registrarCandidato(param).subscribe(
      (result:any)=>{
        console.log(result);
        if(result.body.status == true){
          this.spinner.hide();
          this.resultadoGuardadoActualizado = result.body.status
          this.closeModal();
        }else{
          this.spinner.hide();
        }
      }, (error: HttpErrorResponse) => {
        this.spinner.hide();
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
    this.formGroupParent.controls.logo.setErrors(null);
    this.formGroupParent.controls.foto.setErrors(null);
    this.formGroupParent.markAllAsTouched();
    if(this.formGroupParent.invalid){
      return;
    }
    console.log("aqui");
    this.spinner.show();
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
        "image": ""+ this.previsualizacionFoto,
        "partidoPolitico": ""+this.formGroupParent.value?.partidoPoli,
        "logo": ""+this.previsualizacionLogo,
        "observacion": ""+this.formGroupParent.value?.observacion,
        "regidor": listRegidoresActualizar
      }
      console.log(param);
      this.usuarioService.actualizarCandidato(param).subscribe(
        (result:any)=>{
          if(result.body.status == true){
            this.resultadoGuardadoActualizado = result.body.status
            this.closeModal();
            this.spinner.hide();
            console.log("resul", result);
          }else{
            this.spinner.hide();
          }
        }, (error: HttpErrorResponse) => {
          this.spinner.hide();
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


