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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuariosComponent
  ],
  imports: [
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [appRoutingProviders, EnvironmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
