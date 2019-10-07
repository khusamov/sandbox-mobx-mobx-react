import {observable} from 'mobx';
import Document from './Document';

export default class Project {
	@observable documents: Document[] = [];
}