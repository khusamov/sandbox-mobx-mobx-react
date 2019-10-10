import {observable} from 'mobx';

export default class Document {
	@observable title: string;

	@observable coord: {
		x: number;
		y: number;
	} = {
		x: 0,
		y: 0
	};

	constructor(title: string) {
		this.title = title;
	}
}