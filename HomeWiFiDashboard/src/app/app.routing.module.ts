import { Routes, RouterModule } from '@angular/router';
import {  ModuleWithProviders, NgModule  } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
  

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

