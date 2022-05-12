import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { MarketComponent } from './components/market/market.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { DataService } from './dataService';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    MarketComponent,
    ErrorPageComponent,
    ProfilePageComponent,
    CreateItemComponent,
    ShowMoreComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [CookieService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
