import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:'root'
})

export class UsuarioService {
private base: String;

constructor( private http:HttpClient) {
  this.base = `${environment.baseUrl}`;
}
listarUsuario(){
  return this.http.get(this.base + '/getListaUsuario');
}

}
