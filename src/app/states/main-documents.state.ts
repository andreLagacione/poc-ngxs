import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { MainDocuments, MainDocumentsStateModel } from "../actions/main-documents.action";

@State<MainDocumentsStateModel>({
    name: 'documents',
    defaults: {
        documents: []
    }
})
@Injectable()
export class MainDocumentsState {
    @Action(MainDocuments)
    createDocument(ctx: StateContext<MainDocumentsStateModel>, action: MainDocuments) {
        const state = ctx.getState();
        // ctx.patchState({
        //     documents: [
        //         ...state.documents,
        //         action.document
        //     ]
        // });
    }
}