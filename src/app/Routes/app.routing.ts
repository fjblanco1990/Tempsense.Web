import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AppComponent } from '../app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Components/Login/login/login.component';
import { HomeComponent } from '../Components/Home/home/home.component';
import { UsuariosComponent } from '../Components/Maestros/Usuarios/usuarios/usuarios.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full'},
    { path: 'Login', component: LoginComponent},
    { path: 'Crear-Usuarios', component: UsuariosComponent },
    { path: 'Home', component: HomeComponent},
    { path: '*', component: AppComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders =  RouterModule.forRoot(appRoutes);
