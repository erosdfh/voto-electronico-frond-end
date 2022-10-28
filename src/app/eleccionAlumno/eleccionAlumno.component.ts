import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-eleccionAlumno',
  templateUrl: './eleccionAlumno.component.html',
  styleUrls: ['./eleccionAlumno.component.css']
})
export class EleccionAlumnoComponent implements OnInit {

  minuto: number= 4;
  segundo: number=60;
  interval:any;
  constructor(private messageService: MessageService,
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

}
