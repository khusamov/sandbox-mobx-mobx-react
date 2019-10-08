import {observable, reaction} from 'mobx';
import {IArrayChange, IArraySplice, IObservableArray} from 'mobx';
import Project from './Project';
import Document from './Document';
import DocumentGeometricModel from './DocumentGeometricModel';

export default class ProjectGeometricModel {
	@observable project: Project;

	@observable documentGeometricModels: DocumentGeometricModel[] = [];

	constructor(project: Project) {
		this.project = project;
		reaction(() => this.project.documents, this.onProjectDocumentsChange);
		(this.project.documents as unknown as IObservableArray<Document>).observe(this.onProjectDocumentsSpliceOrUpdate);
	}

	private onProjectDocumentsChange = () => {
		this.documentGeometricModels = this.project.documents.map(document => new DocumentGeometricModel(document));
	};

	private onProjectDocumentsSpliceOrUpdate = (
		(changeData: IArrayChange<Document> | IArraySplice<Document>) => {
			this.onProjectDocumentsChange();
			switch (changeData.type) {
				case 'splice':
					// TODO
					break;
				case 'update':
					this.documentGeometricModels[changeData.index] = new DocumentGeometricModel(changeData.newValue);
					break;
			}
			return changeData;
		}
	)
}