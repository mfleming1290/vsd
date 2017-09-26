import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { AuthComponent } from "./auth/auth.component";
import { StatesComponent} from "./states/states.component";
import { CityComponent } from "./states/cities/city/city.component";
import { AdNewComponent } from "./ads/ad-main/ad-new/ad-new.component";
import { AdListComponent } from "./ads/ad-main/ad-list/ad-list.component";
import {AuthGuard } from './auth.guard'
import { VsdServicesComponent } from "./vsd-services/vsd-services.component";
import { CategoriesComponent } from "./states/cities/categories/categories.component";
import { AdDetailsComponent } from "./ads/ad-main/ad-details/ad-details.component";
import { CitiesComponent } from "./states/cities/cities.component";
import { CategoryAdComponent } from "./states/cities/categories/category-ad/category-ad.component";
import { SearchListComponent } from "./search/search-list/search-list.component";
import { AdSearchComponent } from "./ads/ad-main/ad-search/ad-search.component";
import { AdResultsComponent } from "./ads/ad-main/ad-search/ad-results/ad-results.component";
import { AdMainComponent } from "./ads/ad-main/ad-main.component"
import { AdStateListComponent } from "./ads/ad-main/ad-state-list/ad-state-list.component";
import { AdCategoryListComponent } from "./ads/ad-main/ad-category-list/ad-category-list.component";
import { AdCityListComponent } from "./ads/ad-main/ad-city-list/ad-city-list.component";
import { CityCategoriesComponent } from "./states/cities/city/city-categories/city-categories.component";

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
                component: AdMainComponent,
                canActivate: [AuthGuard],
                children: [
            {
                path: 'new',
                component: AdNewComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'ad-list',
                component: AdListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'state-list',
                component: AdStateListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'city-list',
                component: AdCityListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'category-list',
                component: AdCategoryListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'search',
                component: AdSearchComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'results/:id/:loc',
                    component: AdResultsComponent
                }
                ]
            },
            {
                path: ':id',
                component: AdDetailsComponent,
                canActivate: [AuthGuard]
            },
                ] 
            },
            
        ]
    },
    {
        path: 'search',
        children: [
            {
                path: ':id/:loc',
                component: SearchListComponent
            },
            
        ]
    },
    {
        path: 'states',
        children: [
            {
                path: '',
                component: StatesComponent,
                
            },
            {
                    path: ':city',
                    component: CitiesComponent
                },
            
            {
                path: 'cities/:id',
                component: CityComponent,
                children:[
                    {
                        path: 'list',
                        component: CityCategoriesComponent,
                        
                    },
                    {
                        path: ':cat',
                        component: CategoriesComponent,
                        
                    },
                    
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'list'
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
