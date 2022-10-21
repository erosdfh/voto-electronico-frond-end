import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./about.component";


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [
  ],
})
export class AboutModule {}
