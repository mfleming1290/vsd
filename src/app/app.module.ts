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
import { ModalModule } from 'ngx-bootstrap/modal';
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
import { AdNewComponent } from './ads/ad-main/ad-new/ad-new.component';
import { AdListComponent } from './ads/ad-main/ad-list/ad-list.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { VsdServicesComponent } from './vsd-services/vsd-services.component';
import { CategoriesComponent } from './states/cities/categories/categories.component';
import { StateService } from "./services/state.service";
import { AdDetailsComponent } from './ads/ad-main/ad-details/ad-details.component';
import { CitiesComponent } from './states/cities/cities.component';
import { CityService } from "./services/city.service";
import { CategoryAdComponent } from './states/cities/categories/category-ad/category-ad.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { MailService } from "./services/mail.service";
import { AdSearchComponent } from './ads/ad-main/ad-search/ad-search.component';
import { AdResultsComponent } from './ads//ad-main/ad-search/ad-results/ad-results.component';
import { AdMainComponent } from './ads/ad-main/ad-main.component';
import { AdStateListComponent } from './ads/ad-main/ad-state-list/ad-state-list.component';
import { AdCityListComponent } from './ads/ad-main/ad-city-list/ad-city-list.component';
import { AdCategoryListComponent } from './ads/ad-main/ad-category-list/ad-category-list.component';
import { CategoryService } from "./services/category.service";
import { AccordionModule } from 'ngx-bootstrap';
import { CityCategoriesComponent } from './states/cities/city/city-categories/city-categories.component';
 import { Ng2MapModule} from 'ng2-map';
import {NgxPaginationModule} from 'ngx-pagination';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdBannerListComponent } from './ads/ad-main/ad-banner-list/ad-banner-list.component';
import { AdBannerNewComponent } from './ads/ad-main/ad-banner-new/ad-banner-new.component'



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
    OrderByPipe,
    AdSearchComponent,
    AdResultsComponent,
    AdMainComponent,
    AdStateListComponent,
    AdCityListComponent,
    AdCategoryListComponent,
    CityCategoriesComponent,
    NotFoundComponent,
    AdBannerListComponent,
    AdBannerNewComponent
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
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    Ng2MapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBs51kntlH7SIy7RSibH_S9UNlGcwCUvCg'}),
    NgxPaginationModule,

    
  ],
  providers: [CategoryService, MailService, CityService, StateService, PagerService, AdService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
