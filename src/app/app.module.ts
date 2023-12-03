import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MessagesComponent } from './layouts/messages/messages.component';
// import { StockComponent } from './pages/stock/stock.component';

// import { EventComponent } from './pages/event/event.component';
// import { LocationComponent } from './pages/location/location.component';
// import { OwnerComponent } from './pages/owner/owner.component';
// import { CategoryComponent } from './pages/category/category.component';

// import { StartComponent } from './pages/start/start.component';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
// import { UserComponent } from './pages/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageManagerService } from './services/message-manager.service';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { DisplayComponent } from './components/display/display.component';
import { DetailComponent } from './components/detail/detail.component';
// import { CrudButtonsComponent } from './components/crud-buttons/crud-buttons.component';
// import { StockEventComponent } from './pages/stock-event/stock-event.component';
// import { AssignedUserComponent } from './pages/assigned-user/assigned-user.component';
import { ReferenceInputComponent } from './components/form/reference-input/reference-input.component';
import { DictionaryService } from './services/dictionary.service';
import { AppService } from './services/app.service';
import { UserComponent } from './pages/user/user.component';
import { GroupComponent } from './pages/group/group.component';
import { RightComponent } from './pages/right/right.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CountryComponent } from './pages/country/country.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticleCategoryComponent } from './pages/article-category/article-category.component';
import { CustomerCategoryComponent } from './pages/customer-category/customer-category.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { ReceiptLineComponent } from './pages/receipt/receipt-line/receipt-line.component';



@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MenuComponent,
    FooterComponent,
    // StockComponent,
    // EventComponent,
    // LocationComponent,
    // OwnerComponent,
    // CategoryComponent,
    // StartComponent,
    HelpComponent,
    HomeComponent,
    // UserComponent,
    ListComponent,
    EditComponent,
    DisplayComponent,
    DetailComponent,
    // CrudButtonsComponent,
    // StockEventComponent,
    // AssignedUserComponent,
    ReferenceInputComponent,
    UserComponent,
    GroupComponent,
    RightComponent,
    CustomerComponent,
    CountryComponent,
    CurrencyComponent,
    ArticleComponent,
    ArticleCategoryComponent,
    CustomerCategoryComponent,
    ReceiptComponent,
    ReceiptLineComponent
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    HttpClientModule,    
    FormsModule,
  ],
  providers: [
    DictionaryService,
    {provide: APP_INITIALIZER,   
      // force to load app.service with userdata, dictionary etc before anything would load
      useFactory:  (appService: AppService) => () => {    
        return appService.initService();    
      },
      deps: [AppService] ,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





