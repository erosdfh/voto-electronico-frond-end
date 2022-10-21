import { Component} from "@angular/core";
import { Employee, TableRows } from "./alumnos-data";

@Component({
  templateUrl: "alumnos.component.html",
})

export class AlumnosComponent {

  trow:TableRows[];

  constructor() {
    this.trow=Employee;
  }

  ngOnInit() {

  }
}
