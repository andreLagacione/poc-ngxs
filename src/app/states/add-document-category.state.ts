import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AddDocumentCategory } from "../actions/add-document-category.action";

export interface IDocumentCategory {
    title: string;
    description: string;
    completed: boolean;
}

export interface DocumentsCategoryStateModel {
    documents: IDocumentCategory[];
}

@State<DocumentsCategoryStateModel>({
    name: 'documentsCategory',
    defaults: {
        documents: []
    }
})
@Injectable()
export class AddDocumentCategoryState {
    @Action(AddDocumentCategory)
    addDocumentCategory(ctx: StateContext<DocumentsCategoryStateModel>, action: AddDocumentCategory) {
        // aqui é uma função que é executado sempre que a ação é chamada,
        // é possível "tratar" a informação antes de salva-la na store no patchState
        const state = ctx.getState();
        ctx.patchState({
            documents: [
                ...state.documents,
                action.document
            ]
        });
    }
}