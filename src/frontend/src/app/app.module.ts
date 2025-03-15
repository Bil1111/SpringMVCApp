import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { FindFComponent } from './find-f/find-f.component';
import { BlogAndNewsComponent } from './blog-and-news/blog-and-news.component';
import { DonateComponent } from './donate/donate.component';
import { FreePeopleComponent } from './free-people/free-people.component';
import { SingINComponent } from './sing-in/sing-in.component';
import { RegestComponent } from './regest/regest.component';
import { AdoptComponent } from './adopt/adopt.component';
import { GifthouseComponent } from './gifthouse/gifthouse.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ThignsComponent } from './thigns/thigns.component';
import { ForAllShelterComponent } from './for-all-shelter/for-all-shelter.component';
// import { AdminModule } from './Admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChooseRestoreComponent } from './choose-restore/choose-restore.component';
import { DaltonizmService } from './daltonizm.service';
import { RestorePhoneComponent } from './restore-phone/restore-phone.component';
import { RestoreEmailComponent } from './restore-email/restore-email.component';
import { NewPage2OnlytextComponent } from './new-page2-onlytext/new-page2-onlytext.component';
import { NewPasswordPhoneComponent } from './new-password-phone/new-password-phone.component';
import { NewPasswordEmailComponent } from './new-password-email/new-password-email.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FindFComponent,
    BlogAndNewsComponent,
    DonateComponent,
    FreePeopleComponent,
    SingINComponent,
    RegestComponent,
    AdoptComponent,
    GifthouseComponent,
    ThignsComponent,
    ForAllShelterComponent,
    ChooseRestoreComponent,
    RestorePhoneComponent,
    RestoreEmailComponent,
    NewPage2OnlytextComponent,
    NewPasswordPhoneComponent,
    NewPasswordEmailComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
    // AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
