import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { IMainDocument, MainDocuments } from 'src/app/actions/main-documents.action';
import { MainDocumentsState } from 'src/app/states/main-documents.state';

@Component({
  selector: 'app-main-documents',
  templateUrl: './main-documents.component.html',
  styleUrls: ['./main-documents.component.scss']
})
export class MainDocumentsComponent implements OnInit {

  // @ts-ignore
  @Select(MainDocumentsState) documents$: Observable<IMainDocument[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    // this.store.select(state => state.documents).subscribe(response => console.log('document', response));
    this.store.reset(MainDocumentsState);
  //   const documento: IMainDocument = {
  //     title: 'documento 1',
  //     description: 'documento 1',
  //     uploaded: false,
  // };

  //   this.store.dispatch(new MainDocuments(documento))
  //     .pipe(withLatestFrom(this.documents$))
  //     .subscribe(
  //       response => console.log(response)
  //     )
  }

}
