import React, {Component} from 'react';
import './App.scss';
import Project from './model/Project';
import Document from './model/Document';
import {observer} from 'mobx-react';

const project: Project = new Project();

@observer
export default class App extends Component {
	render() {
		return (
			<div className="App">
				<div>
					<button onClick={this.onNewDocumentButtonClick}>Новый документ</button>
				</div>
				<div>
					<button onClick={this.onChangeDocument3ButtonClick}>Изменить Документ 3</button>
				</div>
				<div>
					Документы:
					{
						project.documents.map((document, index) => <div key={index}>{document.title}</div>)
					}
				</div>
			</div>
		);
	}

	private onNewDocumentButtonClick = () => {
		project.documents.push(new Document(`Документ ${project.documents.length + 1}`));
	};

	private onChangeDocument3ButtonClick = () => {
		project.documents[3 - 1].title = 'Куку';
	};
};