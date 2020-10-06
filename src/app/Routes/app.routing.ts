import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AppComponent } from '../app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Components/Login/login/login.component';
import { HomeComponent } from '../Components/Home/home/home.component';
import { UsuariosComponent } from '../Components/Maestros/Usuarios/usuarios/usuarios.component';
import { TablerosComponent } from '../Components/tableros/tableros.component';
import { EmpresasComponent } from '../Components/empresas/empresas.component';
import { DispositivosComponent } from '../Components/dispositivos/dispositivos.component';
import { ReportesComponent } from '../Components/reportes/reportes.component';
import { UmbralComponent } from '../Components/umbral/umbral.component';

const appRoutes: Routes = [
    { path: 'Login', redirectTo: '/Login', pathMatch: 'full'},
    { path: 'Login', component: LoginComponent},
    { path: 'Home', component: HomeComponent },
    { path: 'Crear-Usuarios', component: UsuariosComponent },
    { path: 'Tablero', component: TablerosComponent },
    { path: 'Empresa', component: EmpresasComponent },
    { path: 'Dispositivos', component: DispositivosComponent },
    { path: 'Usuarios', component: UsuariosComponent },
    { path: 'Reportes', component: ReportesComponent },
    { path: 'Umbral', component: UmbralComponent},
    { path: '', component: LoginComponent },
    { path: '*', component: AppComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders =  RouterModule.forRoot(appRoutes);
