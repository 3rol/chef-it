import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [

  { path: '', redirectTo: 'about-us', pathMatch: 'full' },
  { path: "about-us", component: AboutUsComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: "homepage", component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

