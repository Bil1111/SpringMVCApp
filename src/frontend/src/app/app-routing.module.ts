import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FindFComponent } from './find-f/find-f.component';
import { BlogAndNewsComponent } from './blog-and-news/blog-and-news.component';
import { DonateComponent } from './donate/donate.component';
import { FreePeopleComponent } from './free-people/free-people.component';
import { SingINComponent } from './sing-in/sing-in.component';
import { RegestComponent } from './regest/regest.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'find-f', component: FindFComponent },
  { path: 'blog-and-news', component: BlogAndNewsComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'free-people', component: FreePeopleComponent },
  { path: 'sing-in', component: SingINComponent },
  { path: 'regest', component: RegestComponent },
  //{ path: '', redirectTo: '/about', pathMatch: 'full' }, // Опціонально, щоб перенаправити на нову сторінку за замовчуванням
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }