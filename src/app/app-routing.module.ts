import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { HelpComponent } from './pages/help/help.component';
import { GroupComponent } from './pages/group/group.component';
import { RightComponent } from './pages/right/right.component';
import { CountryComponent } from './pages/country/country.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerCategoryComponent } from './pages/customer-category/customer-category.component';
import { ArticleCategoryComponent } from './pages/article-category/article-category.component';
import { ArticleComponent } from './pages/article/article.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';

const routes: Routes = [
  
  { path: 'home', component: HomeComponent },
  
  {path:'users',component: UserComponent},
  {path:'groups',component: GroupComponent},
  {path:'rights',component: RightComponent},
  {path:'countries',component: CountryComponent},
  {path:'currencies',component: CurrencyComponent},
  {path:'customers',component: CustomerComponent},
  {path:'articles',component: ArticleComponent},
  {path:'customer-categories',component: CustomerCategoryComponent},
  {path:'article-categories',component: ArticleCategoryComponent},
  {path:'receipts',component: ReceiptComponent},

  { path: 'help', component: HelpComponent },
  {path:'',component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
