import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { DataServiceBridgeService } from './data-service-bridge.service';
import { HttpModule } from '@angular/http';


//Apps roots / HashLocationStrategy
const appRoots = [
  { path: '**', redirectTo: 'PageNotFoundComponent' } 
  ];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoots),
    NgbModule.forRoot(),
    HttpClientModule,
    HttpModule,
  ],
  providers: [DataServiceBridgeService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
