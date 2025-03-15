import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashbordComponent } from './admindashbord/admindashbord.component';
import { HeaderComponent } from './header/header.component';
import { ShelteradminComponent } from './shelteradmin/shelteradmin.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { UsersComponent } from './users/users.component';
import { VolontersComponent } from './volonters/volonters.component';
import { AdoptComponent } from './adopt/adopt.component';
import { WardComponent } from './ward/ward.component';
import { BlogComponent } from './blog/blog.component';
import { TabelAnimalsComponent } from './tabel-animals/tabel-animals.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {StatisticsComponent} from './statistics/statistics.component';
// import { ShareService } from '../service/share.service';
@NgModule({
  declarations: [
    AdmindashbordComponent,
    HeaderComponent,
    ShelteradminComponent,
    UsersComponent,
    VolontersComponent,
    AdoptComponent,
    WardComponent,
    BlogComponent,
    TabelAnimalsComponent,
    StatisticsComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    FilterPipeModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,],
    // providers: [ShareService],

})
export class AdminModule { }
