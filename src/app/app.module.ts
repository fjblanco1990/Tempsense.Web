import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './Routes/app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './Components/Maestros/Usuarios/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentService } from './Services/Enviroment/enviroment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresasComponent } from './Components/empresas/empresas.component';
import { SedesComponent } from './Components/sedes/sedes.component';
import { DispositivosComponent } from './Components/dispositivos/dispositivos.component';
import { ReportesComponent } from './Components/reportes/reportes.component';
import { TablerosComponent } from './Components/tableros/tableros.component';
import { UmbralComponent } from './Components/umbral/umbral.component';
import { LayoutComponent } from './Components/Layout/layout/layout.component';
import { PaginaErrorComponent } from './Components/pagina-error/pagina-error.component';
import { HeaderComponent } from './Components/Layout/header/header.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { BitacoraComponent } from './Components/bitacora/bitacora.component';
import { ConfiguracionComponent } from './Components/configuracion/configuracion.component';
import { UserConfigComponent } from './Components/configuracion/user-config/user-config.component';
import { EmpresasConfigComponent } from './Components/configuracion/empresas-config/empresas-config.component';
import { UmbralConfigComponent } from './Components/configuracion/umbral-config/umbral-config.component';
import { BitacorasConfigComponent } from './Components/configuracion/bitacoras-config/bitacoras-config.component';
import { DispositvosConfigComponent } from './Components/configuracion/dispositvos-config/dispositvos-config.component';
import { SedesConfigComponent } from './Components/configuracion/sedes-config/sedes-config.component';
import { TagInputModule } from 'ngx-chips';
// import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuariosComponent,
    EmpresasComponent,
    SedesComponent,
    DispositivosComponent,
    ReportesComponent,
    TablerosComponent,
    UmbralComponent,
    LayoutComponent,
    PaginaErrorComponent,
    HeaderComponent,
    FooterComponent,
    BitacoraComponent,
    ConfiguracionComponent,
    UserConfigComponent,
    EmpresasConfigComponent,
    UmbralConfigComponent,
    BitacorasConfigComponent,
    DispositvosConfigComponent,
    SedesConfigComponent
  ],
  imports: [
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    TagInputModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    // DataTablesModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [appRoutingProviders, EnvironmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
