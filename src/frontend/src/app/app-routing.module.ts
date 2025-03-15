import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FindFComponent } from './find-f/find-f.component';
import { BlogAndNewsComponent } from './blog-and-news/blog-and-news.component';
import { DonateComponent } from './donate/donate.component';
import { FreePeopleComponent } from './free-people/free-people.component';
import { SingINComponent } from './sing-in/sing-in.component';
import { RegestComponent } from './regest/regest.component';
import { AdoptComponent } from './adopt/adopt.component';
import { GifthouseComponent } from './gifthouse/gifthouse.component';
import { ThignsComponent } from './thigns/thigns.component';
import { ForAllShelterComponent } from './for-all-shelter/for-all-shelter.component';
import {accsecAdminGuard} from './accsec-admin.guard';
import { ChooseRestoreComponent } from './choose-restore/choose-restore.component';
import { RestorePhoneComponent } from './restore-phone/restore-phone.component';
import { RestoreEmailComponent } from './restore-email/restore-email.component';
import { NewPage2OnlytextComponent } from './new-page2-onlytext/new-page2-onlytext.component';
import { NewPasswordPhoneComponent } from './new-password-phone/new-password-phone.component';
import { NewPasswordEmailComponent } from './new-password-email/new-password-email.component';
import {WebcamComponent} from './web-camera/web-camera.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'find-f', component: FindFComponent },
  { path: 'blog-and-news', component: BlogAndNewsComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'free-people', component: FreePeopleComponent },
  { path: 'sing-in', component: SingINComponent },
  { path: 'regest', component: RegestComponent },
  { path: 'adopt', component: AdoptComponent },
  { path: 'gifthouse', component: GifthouseComponent },
  { path: 'thigns', component: ThignsComponent },
  { path: 'for-all-shelter', component: ForAllShelterComponent },
  { path: 'choose-restore', component: ChooseRestoreComponent },
  { path: 'restore-phone', component: RestorePhoneComponent },
  { path: 'restore-email', component: RestoreEmailComponent },
  { path: 'new-page2-onlytext', component: NewPage2OnlytextComponent },
  { path: 'new-password-phone', component: NewPasswordPhoneComponent },
  { path: 'new-password-email', component: NewPasswordEmailComponent },
  { path: 'web-camera', component: WebcamComponent },

  { path: 'admin', loadChildren: () => import('./Admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [accsecAdminGuard]
   },

  //{ path: '', redirectTo: '/about', pathMatch: 'full' }, // Опціонально, щоб перенаправити на нову сторінку за замовчуванням
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
