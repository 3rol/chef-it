import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchComponent } from './search/search.component';
import { ItemComponent } from './item/item.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-recipe', pathMatch: 'full' },
  { path: "add-recipe", component: AddRecipeComponent },
  { path: '', redirectTo: 'item', pathMatch: 'full' },
  { path: "my-recipes", component: MyRecipesComponent },
  { path: '', redirectTo: 'item', pathMatch: 'full' },
  { path: "item", component: ItemComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: "search", component: SearchComponent },
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

