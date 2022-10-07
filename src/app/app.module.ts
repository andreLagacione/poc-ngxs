import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ZooComponentComponent } from './components/zoo-component/zoo-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ZooComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
