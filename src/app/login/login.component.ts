import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'voto-electronico-frond-end';
  dni:String='';
  contra:String='';
  value: number = 0;
  lista:any;
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig,
  private route: Router,private usuarioService:UsuarioService,private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

 showSuccess() {
    var doc=this.dni;
    if(doc.length>0){
          this.messageService.add({severity:'success', summary: 'bienvenido', detail: 'Se ingreso correctamente'});
            this.route.navigate(['/menu']);


    }else{
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Debe ingresar documento'});
    }

  }

  login(){
    let param ={
      "user":this.dni,
      "pass": this.contra
    }
    if(this.dni.length>0 && this.contra.length>0){
      this.spinner.show();
      this.usuarioService.login(param).subscribe(
        (result:any)=>{
          this.spinner.hide();
          if(result.status == true){
            if(result.items==1){

              this.messageService.add({severity:'success', summary: 'bienvenido', detail: 'Se ingreso correctamente'});
              this.route.navigate(['/menu']);
            }
            if(result.items==2){
              this.messageService.add({severity:'success', summary: 'bienvenido', detail: 'Se ingreso correctamente'});
            this.route.navigate(['/eleccionAlumno']);
          }
          if(result.items==3){
            this.messageService.add({severity:'error', summary: 'error', detail: 'Ya realizo el sufragio'});
          }

          }else{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'datos incorrectos'});
          }
        }, (error: HttpErrorResponse) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar su conexion y vuelve a intentarlo'});
          this.spinner.hide();
        });
    }else{
      this.messageService.add({severity:'error', summary: 'error', detail: 'Ingrese el Usuario y la contraseña'});
    }


  }


}
