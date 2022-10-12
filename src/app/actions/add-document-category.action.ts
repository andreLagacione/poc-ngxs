import { IDocumentCategory } from "../states/add-document-category.state";

export class AddDocumentCategory {
    static readonly type = '[Documents] AddDocumentCategory';
    constructor (public document: IDocumentCategory) {}
}