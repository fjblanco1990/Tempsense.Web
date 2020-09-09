import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AppComponent } from '../app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Components/Login/login/login.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'Login', pathMatch: 'full'},
    {path: 'Login', component: LoginComponent},
    {path: '*', component: AppComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders =  RouterModule.forRoot(appRoutes);
