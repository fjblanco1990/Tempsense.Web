import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { LoginComponent } from '../Components/Login/login/login.component';
import { HomeComponent } from '../Components/Home/home/home.component';
import { UsuariosComponent } from '../Components/Maestros/Usuarios/usuarios/usuarios.component';
import { TablerosComponent } from '../Components/tableros/tableros.component';
import { EmpresasComponent } from '../Components/empresas/empresas.component';
import { DispositivosComponent } from '../Components/dispositivos/dispositivos.component';
import { ReportesComponent } from '../Components/reportes/reportes.component';
import { UmbralComponent } from '../Components/umbral/umbral.component';
import { LayoutComponent } from '../Components/Layout/layout/layout.component';
import { PaginaErrorComponent } from '../Components/pagina-error/pagina-error.component';
import { SedesComponent } from '../Components/sedes/sedes.component';
import { BitacoraComponent } from '../Components/bitacora/bitacora.component';
import { ConfiguracionComponent } from '../Components/configuracion/configuracion.component';
import { UserConfigComponent } from '../Components/configuracion/user-config/user-config.component';

const appRoutes: Routes = [
    { path: 'Login', redirectTo: '/Login'},
    { path: 'Login', component: LoginComponent},
    // { path: 'Maestros/Empresa', component: EmpresasComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'Crear-Usuarios', component: UsuariosComponent },
    { path: 'Usuarios', component: UserConfigComponent },
    { path: 'Tablero', component: TablerosComponent },
    { path: 'Empresa', component: EmpresasComponent },
    { path: 'Dispositivo', component: DispositivosComponent },
    { path: 'Usuarios', component: UsuariosComponent },
    { path: 'Reportes', component: ReportesComponent },
    { path: 'Umbral', component: UmbralComponent},
    { path: 'Bitacora', component: BitacoraComponent },
    { path: 'Sedes', component: SedesComponent },
    { path: 'Config', component: ConfiguracionComponent },
    { path: '', component: LayoutComponent },
    { path: '*', component: PaginaErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders =  RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
