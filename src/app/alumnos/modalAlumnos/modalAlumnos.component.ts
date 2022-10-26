import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { Input,  Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as XLXS from 'xlsx';
@Component({
  selector: 'app-modalAlumnos',
  templateUrl: './modalAlumnos.component.html',
  styleUrls: ['./modalAlumnos.component.scss']
})
export class ModalAlumnosComponent implements OnInit {
  hide = true;
  isVisible: boolean = true;
  cargarExcel:boolean = true;
  nameFile: string = '';
  data:any;
  arrayBuffer:any;
  file:File;
  titulo:string='';
  capIdCombo : any = []
  comboList: any = [];
  @Input() dataItems1: any = null;
  @Output() showModal= new EventEmitter<Boolean>();

  constructor(
    private usuarioService:UsuarioService,
  ) { }


  ngOnInit() {
    this.comboList = [
      {id: '1', message: 'Primaria'},
      {id: '2', message: 'Secundaria'},

    ];
    this.titulo = this.dataItems1.titulo;
    console.log("data",this.dataItems1);
    if(this.dataItems1.titulo == 'Nuevo'){
      this.cargarExcel = false;
    }
  }
  closeModal(){
    this.isVisible = false;
    this.showModal.emit(false);
  }
  actualizarAlumno(){
    let param =
      [{
      "idalumno":0,
      "dni":'',
      "nombresApellidos":'',
      "grado":'',
      "seccion":'',
      "idNivel":0
    }]
    this.usuarioService.actualizarAlumno(param).subscribe(
      (result:any)=>{
        console.log(result);
      }
    );
  }
  onFileChange(event:any)
    {
    this.file= event.target.files[0];
    console.log(this.file);
    }

   Upload() {
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data1 = new Uint8Array(this.arrayBuffer);
              console.log(data1);
              var arr = new Array();
              for(var i = 0; i != data1.length; ++i) arr[i] = String.fromCharCode(data1[i]);
              var bstr = arr.join("");
              var workbook = XLXS.read(bstr, {type:"binary"});
              console.log(workbook);
              var first_sheet_name = workbook.SheetNames[1];
              console.log("first_sheet_name",first_sheet_name);
              var worksheet = workbook.Sheets[first_sheet_name];
              console.log("worksheet",worksheet);
             // console.log("xls",XLXS.utils.sheet_to_json(worksheet));
              this.data = XLXS.utils.sheet_to_json(worksheet,{raw:true})
              console.log("5555",this.data);
              let dataFor:any = [];
              this.data.forEach((element:any) => {
                if(element.__rowNum__ > 5){
                  dataFor.push({
                    "dni":''+element.__EMPTY_1,
                    "nombresApellidos":''+element.__EMPTY,
                    "grado":''+element.__EMPTY_2,
                    "seccion":''+element.__EMPTY_3,
                    "idNivel":1
                  })
                  //dataFor.push(element);
                }

              });
              console.log("element",dataFor)
              /*this.usuarioService.registrarAlumno(this.data).subscribe(
                (result:any)=>{
                console.log(result);
            });*/
          }
          fileReader.readAsArrayBuffer(this.file);

  }
}
