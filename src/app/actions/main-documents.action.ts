export interface IMainDocument {
    title: string;
    description: string;
    uploaded: boolean;
}

export interface MainDocumentsStateModel {
    documents: IMainDocument[];
}

export class MainDocuments {
    static readonly type = '[Documents] Main';
    constructor (public document: IMainDocument) {}
}