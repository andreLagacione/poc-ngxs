import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { AddDocumentCategory } from 'src/app/actions/add-document-category.action';
import {
  AddDocumentCategoryState,
  IDocumentCategory,
} from 'src/app/states/add-document-category.state';

interface teste {
  documents: IDocumentCategory[]
}

@Component({
  selector: 'app-main-documents',
  templateUrl: './documents-category.component.html',
  styleUrls: ['./documents-category.component.scss'],
})
export class MainDocumentsComponent implements OnInit {
  // @ts-ignore
  @Select(AddDocumentCategoryState) documents$: Observable<teste>;

  constructor(private store: Store) {
    // this.store.subscribe((_response) =>
    //   console.log('documentos', _response.documentsCategory.documents)
    // );

    
  }

  ngOnInit(): void {
    this.documents$.subscribe(item => console.log(item))
    for (let i = 0; i < 2; i++) {
      const documento: IDocumentCategory = {
        title: `documento ${i}`,
        description: `documento ${i}`,
        completed: false,
      };
      this.storeDocument(documento);
    }
  }

  addDocument() {
    const documento: IDocumentCategory = {
      title: `documento manual`,
      description: `documento manual`,
      completed: false,
    };
    this.storeDocument(documento);
  }

  storeDocument(documento: IDocumentCategory) {
    this.store
        .dispatch(new AddDocumentCategory(documento))
        .pipe(withLatestFrom(this.documents$))
        .subscribe(
          (response) => console.log(response),
          error => console.log(error)
        );
  }
}
