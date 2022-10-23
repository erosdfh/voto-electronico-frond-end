import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { Input,  Output } from '@angular/core';
@Component({
  selector: 'app-modalAlumnos',
  templateUrl: './modalAlumnos.component.html',
  styleUrls: ['./modalAlumnos.component.scss']
})
export class ModalAlumnosComponent implements OnInit {
  hide = true;
  isVisible: boolean = true;
  @Input() dataItems1: any = null;
  @Output() showModal= new EventEmitter<Boolean>();

  constructor(
  ) { }

  ngOnInit() {
    console.log("data",);
  }
  closeModal(){
    this.isVisible = false;
    this.showModal.emit(false);
  }

}
