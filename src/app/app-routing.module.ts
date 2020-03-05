import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ContactdetailComponent } from './contactdetail/contactdetail.component';
import { EditComponent } from './edit/edit.component';
import { ManagementComponent } from './management/management.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'management', component: ManagementComponent},
  {path: 'contactdetail/:contactId', component: ContactdetailComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
