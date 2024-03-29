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
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchComponent } from './search/search.component';
import { ItemComponent } from './item/item.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { FaqComponent } from './faq/faq.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TopRecipesCardComponent,
    RegularCardComponent,
    RecentlyViewedCardComponent,
    WeeklyRecommendCardComponent,
    HomepageComponent,
    AboutUsComponent,
    SearchComponent,
    ItemComponent,
    MyRecipesComponent,
    AddRecipeComponent,
    LoginComponent,
    RegisterComponent,
    FaqComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

