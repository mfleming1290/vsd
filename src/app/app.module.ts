import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http"
import { CookieModule } from "ngx-cookie";
import { CollapseModule } from "ngx-bootstrap";
import { BsDropdownModule } from 'ngx-bootstrap';
import { PagerService } from "./services/pager.service";
import { SearchPipe } from "./search.pipe";
import { OrderByPipe } from './order-by.pipe';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./services/auth.service";
import { AuthComponent } from './auth/auth.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { StatesComponent } from './states/states.component';
import { CityComponent } from './states/cities/city/city.component';
import { AdService } from './services/ad.service';
import { AdNewComponent } from './ads/ad-new/ad-new.component';
import { AdListComponent } from './ads/ad-list/ad-list.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { VsdServicesComponent } from './vsd-services/vsd-services.component';
import { CategoriesComponent } from './states/cities/categories/categories.component';
import { StateService } from "./services/state.service";
import { AdDetailsComponent } from './ads/ad-details/ad-details.component';
import { CitiesComponent } from './states/cities/cities.component';
import { CityService } from "./services/city.service";
import { CategoryAdComponent } from './states/cities/categories/category-ad/category-ad.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthComponent,
    NavComponent,
    FooterComponent,
    StatesComponent,
    CityComponent,
    AdNewComponent,
    AdListComponent,
    FileSelectDirective,
    FileDropDirective,
    VsdServicesComponent,
    CategoriesComponent,
    SearchPipe,
    AdDetailsComponent,
    CitiesComponent,
    CategoryAdComponent,
    SearchListComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    
  ],
  providers: [CityService, StateService, PagerService, AdService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
