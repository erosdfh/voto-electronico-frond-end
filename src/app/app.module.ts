import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { CardModule, } from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import {ImageModule} from 'primeng/image';
import {DockModule} from 'primeng/dock';
import {MenubarModule} from 'primeng/menubar';
import {HttpClientModule} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { PanelModule } from 'primeng/panel';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { AboutComponent } from './about/about.component';
import { ModalCandidatosComponent } from './candidatos/modalCandidatos/modalCandidatos.component';
import { ModalUsuariosComponent } from './usuarios/modalUsuarios/modalUsuarios.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { TopCardsComponent } from './top-cards/top-cards.component';
import { KnobModule } from "primeng/knob";
import { ModalAlumnosComponent } from './alumnos/modalAlumnos/modalAlumnos.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { ReportesComponent } from './reportes/reportes.component';
import { ReporteTotalComponent } from './reporteTotal/reporteTotal.component';
import { DialogModule } from 'primeng/dialog';
import { UsuarioModalModule } from './usuarios/usuarioModal.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {MatSelectModule} from '@angular/material/select';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AboutComponent,
    ModalCandidatosComponent,
    CandidatosComponent,
    AlumnosComponent,
    TopCardsComponent,
    ModalAlumnosComponent,
    ReportesComponent,
    ReporteTotalComponent,
    ModalAlumnosComponent,
    AlumnosComponent
   ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    RippleModule,
    ImageModule,
    DockModule,
    MenubarModule,
    HttpClientModule,
    DragDropModule,
    CommonModule,
    ToastModule,
    ButtonModule,
    ProgressBarModule,
    PanelModule,
    SliderModule,
    TableModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    KnobModule,
    MatMenuModule,
    MatCardModule,
    ReactiveFormsModule,
    UsuarioModalModule,
    DialogModule,
    NgxMatFileInputModule,
    MatSelectModule,
    ConfirmDialogModule,
    NgxSpinnerModule,

  ],

  providers: [MessageService, ConfirmationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
