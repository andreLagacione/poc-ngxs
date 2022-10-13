import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { DocumentCategory } from "../models/document-category.dto";

@Injectable({
    providedIn: 'root'
})
export class DocumentsCategoryService {

    private mockDocumentCategory: DocumentCategory[] = [{
        title: 'Documentos da empresa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: false,
        route: 'company-documents',
        id: '1',
    }, {
        title: 'Documentos pessoais',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: false,
        route: '',
        id: '2',
    }, {
        title: 'Selfie',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        completed: false,
        route: '',
        id: '3',
    }];

    get(): Observable<DocumentCategory[]> {
        console.log('========================================');
        console.log('=== API de categorias dos documentos ===');
        console.log('========================================');
        return of(this.mockDocumentCategory).pipe(
            tap(
                item => item.map( document => new DocumentCategory(document.title, document.description, document.completed))
            )
        );
    }
}