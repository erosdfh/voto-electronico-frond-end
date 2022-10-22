import { Input, Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalUsuarios } from '../usuarios-data';
import { UsuariosComponent } from '../usuarios.component';

@Component({
  selector: 'app-modalUsuarios',
  templateUrl: 'modalUsuarios.component.html',
  styleUrls: ['./modalUsuarios.component.scss']
})
export class ModalUsuariosComponent {
  isVisible: boolean = true;
  hide = true;
  formGroupParent : FormGroup;
  @Input() dataItem: any = null;
  @Output() showModal= new EventEmitter<boolean>();
  idUsuario: number;
  constructor(

    private usuarioService:UsuarioService,
    private fb : FormBuilder,
    private messageService: MessageService,
  ) {
    this.formGroupParent = this.fb.group({
      email: new FormControl ('', [Validators.required, Validators.email]),
      first_surname: new FormControl ('', [Validators.required]),
      name:  new FormControl ('', [Validators.required]),
      name_user:  new FormControl ('', [Validators.required]),
      psw: new FormControl ('', [Validators.required]),
      second_surname: new FormControl ('', [Validators.required])
    });
  }


  ngOnInit(): void {
    console.log("modal usuario", this.dataItem);
    if(this.dataItem.titulo == "Editar"){
      this.formGroupParent.controls['email'].setValue(this.dataItem.e.email);
      this.formGroupParent.controls['first_surname'].setValue(this.dataItem.e.first_surname);
      this.formGroupParent.controls['name'].setValue(this.dataItem.e.name);
      this.formGroupParent.controls['name_user'].setValue(this.dataItem.e.name_user);
      this.formGroupParent.controls['psw'].setValue(this.dataItem.psw);
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
    this.formGroupParent.markAllAsTouched();
    if(this.formGroupParent.invalid){
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Debe ingresar documento'});
      return;
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

}


