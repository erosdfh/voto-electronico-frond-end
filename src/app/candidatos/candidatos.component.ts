import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
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
msgs:any = [];
getPageSymbol(current: number) {
return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
}
  constructor(
    public dialog: MatDialog,
    private usuarioService:UsuarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService
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
    this.spinner.show();
    let param  = +(this.buscarCandidato ? +this.buscarCandidato : "")
    console.log(param);
    this.usuarioService.listarCandidato(param).subscribe(
      (result:any)=>{
        if(result.items.length != 0){
          this.listaCandidatos = result;
          this.spinner.hide();
        }else{
          this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'No existe registros para mostrar'});
          this.spinner.hide();
        }
        console.log(result);
      },(error: HttpErrorResponse) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar su conexion y vuelve a intentarlo'});
        this.spinner.hide();
      })
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

}
confimacionEliminarDialog(e:any) {
  this.confirmationService.confirm({
      message: '¿Esta seguro de eliminar el registro?',
      header: 'Confirmación Eliminar ',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.eliminar(e);
          this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
      key: "positionDialog"
  });
}
eliminar(e:any){
  console.log(e);
  this.spinner.show();
this.usuarioService.eliminarCandidato(e.idCandidato).subscribe(
  (result:any)=>{
    if(result.body.status == true){
      this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'El registro de elimino de forma correcta'});
      this.listarCandidatos();
      this.spinner.hide();
    }else{
      this.spinner.hide();
    }
  }, (error: HttpErrorResponse) => {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar su conexion y vuelve a intentarlo'});
    this.spinner.hide();
  });


}
}
