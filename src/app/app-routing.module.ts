import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { AuthComponent } from "./auth/auth.component";
import { StatesComponent} from "./states/states.component";
import { CityComponent } from "./states/cities/city/city.component";
import { AdNewComponent } from "./ads/ad-new/ad-new.component";
import { AdListComponent } from "./ads/ad-list/ad-list.component";
import {AuthGuard } from './auth.guard'
import { VsdServicesComponent } from "./vsd-services/vsd-services.component";
import { CategoriesComponent } from "./states/cities/categories/categories.component";
import { AdDetailsComponent } from "./ads/ad-details/ad-details.component";
import { CitiesComponent } from "./states/cities/cities.component";
import { CategoryAdComponent } from "./states/cities/categories/category-ad/category-ad.component";
import { SearchListComponent } from "./search/search-list/search-list.component";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingComponent
    },
    {
        path: 'login',
        component: AuthComponent 
    },
    {
        path: 'ad/:id',
        component: CategoryAdComponent
    },
    {
        path: 'ads',
        canActivate: [AuthGuard], 
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AdListComponent,
                canActivate: [AuthGuard] 
            },
            {
                path: 'new',
                component: AdNewComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                component: AdDetailsComponent,
                canActivate: [AuthGuard]
            },
            
        ]
    },
    {
        path: 'search',
        children: [
            {
                path: ':id',
                component: SearchListComponent
            },
            
        ]
    },
    {
        path: 'states',
        children: [
            {
                path: '',
                // pathMatch: 'full',
                component: StatesComponent,
                children: [
                {
                    path: ':city',
                    component: CitiesComponent
                },
                ]
            },
            
            {
                path: 'cities/:id',
                component: CityComponent,
                children:[
                    {
                        path: ':cat',
                        component: CategoriesComponent,
                        
                    },
                ]
            },
            
            
        ]
    },
    {
        path: 'services',
        component: VsdServicesComponent

    },
    {
        path: 'home',
        redirectTo: '',
    },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
