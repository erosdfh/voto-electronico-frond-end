import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  value: number = 0;
  lista:any;
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig,
  private route: Router,private usuarioService:UsuarioService) {}

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

  /*listarUsuario(){
    this.usuarioService.listarUsuario().subscribe((result: any) => {
      this.lista = result.dato;
      console.log(this.lista);
  }, (error: HttpErrorResponse) => {
  });
  }*/
}
