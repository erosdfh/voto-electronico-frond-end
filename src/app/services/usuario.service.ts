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
elimarUsuario(idUsuarioEliminar : number){
  return this.http.get(this.base +'usuario/eliminarusuario?id=' + idUsuarioEliminar);
}

eliminarCandidato(idCandidato: number){
  return this.http.get(this.base + 'candidato/eliminarCandidato?id='+idCandidato);
}
listarAlumnos(idAlumno:number){
  return this.http.get(this.base + 'alumno/listarAlumno?id=' + idAlumno);
}
//http://localhost:8094/alumno/registrarAlumno
registrarAlumno(param:any){
  console.log("1111",param);
  return this.http.post( `${this.base}alumno/registrarAlumno`,param);
}
actualizarAlumno(param:any){
  return this.http.post(`${this.base}alumno/actualizarAlumno`, param);
}
eliminarAlumno(idAlumno: number){
  return this.http.get(this.base + 'alumno/eliminarAlumno?id=' + idAlumno);
}
login(param:any){
  return this.http.post(this.base + 'votos/login' , param);
}

}
