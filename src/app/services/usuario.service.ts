import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:'root'
})

export class UsuarioService {
  base = environment.baseUrl;

constructor( private http:HttpClient) {
  //this.base = `${environment.baseUrl}`;
}
/*listarUsuarios(){
  return this.http.get(this.base + '/getListaUsuario');
}*/

//http://42ea-179-6-101-64.ngrok.io/usuario/listarUsuario?id=3
listarUsuario(idUsuario: number) {
  return this.http.get(this.base + 'usuario/listarUsuario?id=' + idUsuario );
}
//http://cfaf-179-6-101-64.ngrok.io/usuario/registrarUsuario
registrarUsuario(param:any){
  return this.http.post(`${this.base}usuario/registrarUsuario`, param);
}
//http://42ea-179-6-101-64.ngrok.io/usuario/actualizarUsuario
actualizarUsuario(param:any){
  return this.http.post(`${this.base}usuario/actualizarUsuario`, param);
}
//http://df89-179-6-101-64.ngrok.io/candidato/listarCandidato?id
listarCandidato(idCandidato: number) {
  return this.http.get(this.base + 'candidato/listarCandidato?id=' + idCandidato );
}
registrarCandidato(param:any){
  return this.http.post(`${this.base}candidato/registrarCandidato`, param);
}
actualizarCandidato(param:any){
  return this.http.post(`${this.base}candidato/actualizarCandidato`, param);
}
}
