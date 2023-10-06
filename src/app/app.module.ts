import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentComponent } from './MyComponents/main-content/main-content.component';
import { HeaderComponent } from './MyComponents/header/header.component';
import { SearchComponent } from './MyComponents/search/search.component';
import { FormComponent } from './MyComponents/form/form.component';
import { TableComponent } from './MyComponents/table/table.component';
@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    HeaderComponent,
    SearchComponent,
    FormComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
