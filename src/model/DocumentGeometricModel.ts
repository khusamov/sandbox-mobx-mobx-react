import {observable} from 'mobx';
import Document from './Document';

export default class DocumentGeometricModel {
	@observable document: Document;

	constructor(document: Document) {
		this.document = document;
	}
}