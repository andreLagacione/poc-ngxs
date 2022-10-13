import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, take, withLatestFrom } from 'rxjs';
import { UpdateDocumentCategory } from '../documents-category/actions/update-document-category.action';
import { AddCompanyDocument } from './actions/add-company-document.action';
import { UpdateCompanyDocument } from './actions/update-company-document.action';
import { CompanyDocumentStateModel } from './models/company-document-state.model';
import { ICompanyDocument } from './models/company-document.interface';
import { CompanyDocumentsService } from './services/company-documents.service';
import { AddCompanyDocumentState } from './states/add-company-document.state';

@Component({
  selector: 'app-company-documents',
  templateUrl: './company-documents.component.html',
  styleUrls: ['./company-documents.component.scss']
})
export class CompanyDocumentsComponent implements OnInit {

  // @ts-ignore
  @Select(AddCompanyDocumentState) documents$: Observable<CompanyDocumentStateModel>;
  // @ts-ignore
  @Select(AddCompanyDocumentState.hasDocuments) hasDocuments$: Observable<boolean>;

  constructor(
    private store: Store,
    private companyDocumentsService: CompanyDocumentsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hasDocuments$.pipe(take(1)).subscribe(_response => {
      if (!_response) this.getDocuments();
    });

    this.documents$.subscribe(_response => this.checkIfRequiredDocumentWasUpdated(_response.documents));
  }

  getDocuments() {
    this.companyDocumentsService.get().subscribe(_response => {
      _response.map(document => {
        this.store.dispatch(new AddCompanyDocument({
          id: document.id,
          title: document.title,
          description: document.description,
          isRequired: document.isRequired,
          uploaded: document.uploaded,
        }))
        .pipe(withLatestFrom(this.documents$));
      });
    });
  }

  uploadDocument(document: ICompanyDocument) {
    this.store.dispatch(new UpdateCompanyDocument({
      ...document,
      uploaded: true
    }))
    .pipe(withLatestFrom(this.documents$));
  }

  voltar() {
    this.router.navigate(['']);
  }

  checkIfRequiredDocumentWasUpdated(documents: ICompanyDocument[]) {
    const wasUpdated = !!documents.filter(document => document.isRequired && document.uploaded).length;
    if (!wasUpdated) return;
    const storeSnapshot = this.store.snapshot();

    if (storeSnapshot.documentsCategory.documents.length) {
      this.store.dispatch(new UpdateDocumentCategory({
        title: 'Documentos da empresa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: true,
        route: 'company-documents',
        id: '1',
      }));
    }
  }

}
