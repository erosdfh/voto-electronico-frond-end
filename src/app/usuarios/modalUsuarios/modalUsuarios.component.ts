import { Input, Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modalUsuarios',
  templateUrl: 'modalUsuarios.component.html',
  styleUrls: ['./modalUsuarios.component.scss']
})
export class ModalUsuariosComponent {
  isVisible: boolean = true;
  hide = true;
  hideConfir = true;
  formGroupParent : any = [];
  verContra : boolean = false;
  @Input() dataItem: any = null;
  @Output() showModal= new EventEmitter<boolean>();
  idUsuario: number;
  constructor(

    private usuarioService:UsuarioService,
    private fb : FormBuilder,
    private messageService: MessageService,
  ) {

  }


  ngOnInit(){
    this.formGroupParent = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      first_surname: new FormControl ('', [Validators.required]),
      name:  new FormControl ('', [Validators.required]),
      name_user:  new FormControl ('', [Validators.required]),
      second_surname: new FormControl ('', [Validators.required]),
      contrasenias : this.fb.array([])
    });
    console.log("modal usuario", this.dataItem);
    if(this.dataItem.titulo == "Editar"){
      this.verContra = true;
      this.formGroupParent.controls['email'].setValue(this.dataItem.e.email);
      this.formGroupParent.controls['first_surname'].setValue(this.dataItem.e.first_surname);
      this.formGroupParent.controls['name'].setValue(this.dataItem.e.name);
      this.formGroupParent.controls['name_user'].setValue(this.dataItem.e.name_user);
      //this.formGroupParent.controls['psw'].setValue(this.dataItem.psw);
      this.formGroupParent.controls['second_surname'].setValue(this.dataItem.e.second_surname);
      this.idUsuario = this.dataItem.e.idUsers
    }else if(this.dataItem.titulo == "Ver"){
      this.formGroupParent = this.fb.group({
        email: new FormControl ({value: this.dataItem.e.email, disabled : true}),
        first_surname: new FormControl ({value: this.dataItem.e.first_surname, disabled : true}),
        name:  new FormControl ({value: this.dataItem.e.name, disabled : true}),
        name_user:  new FormControl ({value: this.dataItem.e.name_user, disabled : true}),
        psw: new FormControl ({value: this.dataItem.e.psw, disabled : true}),
        second_surname: new FormControl ({value: this.dataItem.e.second_surname, disabled : true}),
      });
      this.verContra = false;
    } else if(this.dataItem.titulo == "Nuevo" ){
      this.formGroupParent = this.fb.group({
        email: new FormControl ('', [Validators.required, Validators.email]),
        first_surname: new FormControl ('', [Validators.required]),
        name:  new FormControl ('', [Validators.required]),
        name_user:  new FormControl ('', [Validators.required]),
        second_surname: new FormControl ('', [Validators.required]),
        contrasenias : this.fb.array([])
      });
      this.verContra = false;
      this.verOcultarContraseña();
    }
  }

  closeModal(){
    this.isVisible = false;
    this.showModal.emit(false);
  }
  seleccion(){
    if(this.idUsuario > 0){
      this.actualizaUsuario();
    }else{
      this.registUsuario();
    }
  }
  registUsuario(){
    if(this.formGroupParent.value?.confirContrasenia == this.formGroupParent.value?.psw){
      this.formGroupParent.controls['confirContrasenia'].setErrors(null);
      this.formGroupParent.controls['psw'].setErrors(null);
    }
    this.formGroupParent.markAllAsTouched();
    if(this.formGroupParent.invalid){
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Debe ingresar documento'});
      console.log("formgroup", this.formGroupParent);
      return;
    }
    if(this.formGroupParent.value?.confirContrasenia != this.formGroupParent.value?.psw){
      this.formGroupParent.controls['confirContrasenia'].setErrors({valid: false});
      this.formGroupParent.controls['psw'].setErrors({valid: false});
      return ;
    }
    let param = {
        "email": ""+this.formGroupParent.value?.email,
        "first_surname": ""+this.formGroupParent.value?.first_surname,
        "name": ""+this.formGroupParent.value?.name,
        "name_user": ""+this.formGroupParent.value?.name_user,
        "psw": ""+this.formGroupParent.value?.psw,
        "second_surname": ""+this.formGroupParent.value?.second_surname
      }
      console.log(param);
    this.usuarioService.registrarUsuario(param).subscribe(
      (result:any) =>{
        if(result.body.status == true){
          this.closeModal();
          console.log("resultActu",result);
        }
      });
  }
  actualizaUsuario(){
    /*this.formGroupParent.markAllAsTouched();
    if(this.formGroupParent.invalid){
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Debe ingresar documento'});
      return;
    }/*/
    let param = {
        "email": ""+this.formGroupParent.value?.email,
        "estado": "A",
        "first_surname": ""+this.formGroupParent.value?.first_surname,
        "idUsers": this.idUsuario,
        "name": ""+this.formGroupParent.value?.name,
        "name_user": ""+this.formGroupParent.value?.name_user,
        "psw": ""+this.formGroupParent.value?.psw,
        "second_surname": ""+this.formGroupParent.value?.second_surname
    }
    this.usuarioService.actualizarUsuario(param).subscribe(
      (result:any) => {
        if(result.body.status == true){
          this.closeModal();
          console.log("resultActu",result);
        }

      });
  }

  verOcultarContraseña(){
    console.log(this.formGroupParent.controls.contrasenias);
    (this.formGroupParent.controls.contrasenias as FormArray).push(
      this.fb.group({
        psw: ['', Validators.required],
        confirContrasenia: ['', Validators.required],
      }));
  }
  agregarC(){
    if(+(this.formGroupParent.controls.contrasenias as FormArray).length > 0){
      return;
    }
    (this.formGroupParent.controls.contrasenias as FormArray).push(
      this.fb.group({
        psw: ['', Validators.required],
        confirContrasenia: ['', Validators.required],
      }));
  }
  eliminarC(nindex:number){
    if(+(this.formGroupParent.controls.contrasenias as FormArray).length > 0){
      (this.formGroupParent.controls.contrasenias as FormArray).removeAt(nindex);
    }
  }
}


