import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Inject,EventEmitter, ViewEncapsulation } from '@angular/core';
import { Input,  Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as XLXS from 'xlsx';
@Component({
  selector: 'app-modalAlumnos',
  templateUrl: './modalAlumnos.component.html',
  styleUrls: ['./modalAlumnos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalAlumnosComponent implements OnInit {
  hide = true;
  isVisible: boolean = true;
  cargarExcel:boolean = true;
  data:any;
  arrayBuffer:any;
  file:File;
  titulo:string='';
  capIdCombo : any = []
  comboList: any = [];
  formGropuParent: any = [];
  formGroupParent1:any = [];
  listResult:any = [];
  tituloResponse: string = '';
  nivel= [
    {idN: 1, mss: 'Primeria'},
    {idN: 2, mss: 'Secundaria'}
  ]
  @Input() dataItems1: any = null;
  @Output() showModal= new EventEmitter();

  constructor(
    private usuarioService:UsuarioService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.formGropuParent = this.fb.group({
      ApNombres: new FormControl ('', [Validators.required]),
      dni: new FormControl ('', [Validators.required]),
      grado: new FormControl ('', [Validators.required]),
      seccion: new FormControl ('', [Validators.required]),
      nivel:new FormControl ('', [Validators.required])
    });
   }


  ngOnInit() {
    console.log(this.nivel);
    this.titulo = this.dataItems1.titulo;
    console.log("data",this.dataItems1);
    if(this.dataItems1.titulo == 'Nuevo'){
      this.formGroupParent1 = this.fb.group({
        nivel: new FormControl('', [Validators.required]),
        cargaM: new FormControl('', [Validators.required]),
      })
      this.cargarExcel = false;
    }else if(this.dataItems1.titulo == 'Editar'){
      this.formGropuParent.controls.ApNombres.setValue(this.dataItems1.e.nombresApellidos);
      this.formGropuParent.controls.dni.setValue(this.dataItems1.e.dni);
      this.formGropuParent.controls.grado.setValue(this.dataItems1.e.grado);
      this.formGropuParent.controls.seccion.setValue(this.dataItems1.e.seccion);
      this.formGropuParent.controls.nivel.setValue(this.dataItems1.e.idNivel);
    }else if(this.dataItems1.titulo == 'Ver'){
      this.formGropuParent = this.fb.group({
        ApNombres: new FormControl ({value: this.dataItems1.e.nombresApellidos, disabled : true}),
        dni: new FormControl ({value: this.dataItems1.e.dni, disabled: true}),
        grado: new FormControl ({value: this.dataItems1.e.grado, disabled: true}),
        seccion: new FormControl ({value:this.dataItems1.e.seccion, disabled: true}),
        nivel:new FormControl ({value: this.dataItems1.e.idNivel, disabled: true})
      });
    }
  }
  closeModal(){
    this.isVisible = false;
    if(this.listResult.statusCodeValue == 200){
      let listRes = this.listResult
      let tituloRespons = this.tituloResponse
      let lisMandar = {listRes, titulo:tituloRespons};
      console.log("kill",this.listResult.statusCodeValue);
      this.showModal.emit(lisMandar);
    }else{
      this.showModal.emit(false);
    }
    this.listResult = [];
    //
    //this.showModal.caller(this.lismifdaf());
  }
  actualizarAlumno(){
    this.formGropuParent.markAllAsTouched();
    if(this.formGropuParent.invalid){
      return;
    }
    let param =
      [{
      "idalumno": this.dataItems1.e.idalumno,
      "dni":''+ this.formGropuParent.value?.dni,
      "nombresApellidos":''+this.formGropuParent.value?.ApNombres,
      "grado":''+this.formGropuParent.value?.grado,
      "seccion":''+this.formGropuParent.value?.seccion,
      "idNivel": +this.formGropuParent.value?.nivel
    }]
    this.usuarioService.actualizarAlumno(param).subscribe(
      (result:any)=>{
        if(result.body.status == true){
          console.log(result);
          this.listResult= result;
          this.closeModal();
        }
      },(error: HttpErrorResponse) => {
      });
  }
  accion(){
    if(this.dataItems1.titulo == 'Nuevo'){
      this.Upload();
      this.tituloResponse =  'N';
    }else if(this.dataItems1.titulo == 'Editar'){
      this.actualizarAlumno();
      this.tituloResponse =  'E';
    }
  }
  onFileChange(event:any)
    {
    this.file= event.target.files[0];
    console.log(this.file);
    }

   Upload() {
    this.formGroupParent1.markAllAsTouched();
    if(this.formGroupParent1.invalid){
      return;
    }
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data1 = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data1.length; ++i) arr[i] = String.fromCharCode(data1[i]);
              var bstr = arr.join("");
              var workbook = XLXS.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[1];
              var worksheet = workbook.Sheets[first_sheet_name];
              this.data = XLXS.utils.sheet_to_json(worksheet,{raw:true})
              let dataFor:any = [];
              this.data.forEach((element:any) => {
                if(element.__rowNum__ > 5){
                  dataFor.push({
                    "dni":''+element.__EMPTY_1,
                    "nombresApellidos":''+element.__EMPTY,
                    "grado":''+element.__EMPTY_2,
                    "seccion":''+element.__EMPTY_3,
                    "idNivel":+this.formGroupParent1.value?.nivel
                  });
                }

              });
              console.log("element",dataFor)
              this.usuarioService.registrarAlumno(dataFor).subscribe(
                (result:any)=>{
                  if(result.body.status == true){
                    this.listResult = result;
                    this.closeModal();
                  }
                  console.log(result);
                },(error: HttpErrorResponse) => {

                });
          }
          fileReader.readAsArrayBuffer(this.file);

  }
}
