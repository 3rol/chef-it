import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TopRecipesCardComponent } from './top-recipes-card/top-recipes-card.component';
import { RegularCardComponent } from './regular-card/regular-card.component';
import { RecentlyViewedCardComponent } from './recently-viewed-card/recently-viewed-card.component';
import { WeeklyRecommendCardComponent } from './weekly-recommend-card/weekly-recommend-card.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TopRecipesCardComponent,
    RegularCardComponent,
    RecentlyViewedCardComponent,
    WeeklyRecommendCardComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
