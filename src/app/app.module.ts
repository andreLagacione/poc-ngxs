import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { ZooComponentComponent } from './components/zoo-component/zoo-component.component';
import { AddDocumentCategoryState } from './states/add-document-category.state';
import { MainDocumentsComponent } from './components/main-documents/main-documents.component';
import { ZooState } from './states/zoo.state';

@NgModule({
  declarations: [
    AppComponent,
    ZooComponentComponent,
    MainDocumentsComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AddDocumentCategoryState, ZooState], {
      developmentMode: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
