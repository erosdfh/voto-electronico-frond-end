import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../services/usuario.service';
import {Product,TopSelling, TableRows, Employee} from './candidatos-data';
import { ModalCandidatosComponent } from './modalCandidatos/modalCandidatos.component';


@Component({
    selector: 'app-candidatos',
    templateUrl: 'candidatos.component.html'
})
export class CandidatosComponent {
  topSelling:Product[];

  trow:TableRows[];
page = 1;
page2 = 1;
currentPage = 3;
disablepage = 3;
pagecustom = 4;
customers: any[];
loading: boolean = true;
activityValues: number[] = [0, 100];
verModalCandidato: boolean = false;
listaCandidatos: any = [];
buscarCandidato: string = '';
listaCandidatoEdit: any = [];
getPageSymbol(current: number) {
return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
}
  constructor(
    public dialog: MatDialog,
    private usuarioService:UsuarioService
    ) {
    this.topSelling=TopSelling;
    this.trow=Employee;
  }
  ngOnInit(){
    this.listarCandidatos();
  }
  buscarCandidatos(e:any){
    if(e.key == "Enter"){
      this.listarCandidatos();
    }
    console.log(e);
    console.log(this.buscarCandidato);
  }

  listarCandidatos(){
    let param  = +(this.buscarCandidato ? +this.buscarCandidato : "")
    console.log(param);
    this.usuarioService.listarCandidato(param).subscribe(
      (result:any)=>{
        this.listaCandidatos = result
        console.log(result);
      }
    )
  }
  openDialog(e:string, editar:any): void {
    this.listaCandidatoEdit = {e, titulo:editar};
    console.log("111",this.listaCandidatoEdit);
    this.verModalCandidato = true;
    console.log(e);
}
abrirModalCandidato(e:any){
  this.verModalCandidato = e;
  if(e == false){
    this.listarCandidatos();
    //this.listaCandidatos = [];
  }else{

  }

  console.log("asdsa",e);
}
}
