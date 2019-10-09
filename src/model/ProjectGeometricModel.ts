import {observable} from 'mobx';
import Project from './Project';
import DocumentGeometricModel from './DocumentGeometricModel';
import mappingObservableArray from './mappingObservableArray';

export default class ProjectGeometricModel {
	@observable project: Project;

	@observable documentGeometricModels: DocumentGeometricModel[] = [];

	constructor(project: Project) {
		this.project = project;

		// mappingObservableArray(this, 'project.documents > documentGeometricModels', DocumentGeometricModel)

		mappingObservableArray({
			from: [this.project, 'documents'],
			to: [this, 'documentGeometricModels'],
			MapConstructor: DocumentGeometricModel
		});
	}
}