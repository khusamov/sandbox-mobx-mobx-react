import {observable} from 'mobx';

export default class Document {
	@observable title: string;

	constructor(title: string) {
		this.title = title;
	}
}