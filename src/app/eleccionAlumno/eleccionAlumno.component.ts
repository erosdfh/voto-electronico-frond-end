import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-eleccionAlumno',
  templateUrl: './eleccionAlumno.component.html',
  styleUrls: ['./eleccionAlumno.component.scss']
})
export class EleccionAlumnoComponent implements OnInit {

  minuto: number= 4;
  segundo: number=60;
  interval:any;
  msgs:any = [];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router) {
  }


  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.segundo > 0) {
        this.segundo--;
      }else{
        this.minuto--;
        this.segundo=60;
      }
      if(this.minuto==0 && this.segundo==60){
        this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'ya se acaba su tiempo'});
      }
      if(this.minuto==0 && this.segundo==0){
        this.route.navigate(['/login']);
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  confimacionEliminarDialog(e:any) {
    this.confirmationService.confirm({
        message: '¿Estas seguro de elegir este candidato?',
        header: 'Confirmación de elección ',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            this.registrarEleccion(e);
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        },
        key: "positionDialog"
    });
  }
  registrarEleccion(e:any){
    this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'La elección se realizó de forma correcta'});
    setTimeout(() => {
      this.route.navigate(['/login']);
    }, 500);


  }
}
