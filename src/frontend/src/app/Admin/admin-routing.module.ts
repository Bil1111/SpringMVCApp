import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdmindashbordComponent} from './admindashbord/admindashbord.component';
import {HeaderComponent} from './header/header.component';
import {ShelteradminComponent} from './shelteradmin/shelteradmin.component';
import {AdoptComponent} from './adopt/adopt.component';
import {BlogComponent} from './blog/blog.component';
import {UsersComponent} from './users/users.component';
import {VolontersComponent} from './volonters/volonters.component';
import {WardComponent} from './ward/ward.component';
import {TabelAnimalsComponent} from './tabel-animals/tabel-animals.component';
import {accsecAdminGuard} from '../accsec-admin.guard';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
  {
    path: '', component: AdmindashbordComponent,
    canActivate: [accsecAdminGuard],
    children: [
      {path: 'header', component: HeaderComponent},
      {path: 'shelteradmin', component: ShelteradminComponent},
      {path: 'adopradmin', component: AdoptComponent},
      {path: 'blogadmin', component: BlogComponent},
      {path: 'usersadmin', component: UsersComponent},
      {path: 'volonteradmin', component: VolontersComponent},
      {path: 'wardadmin', component: WardComponent},
      {path: 'tabel-animals', component: TabelAnimalsComponent},
      {path: 'statistics', component: StatisticsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
