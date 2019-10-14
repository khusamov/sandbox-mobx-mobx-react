import React, {Component} from 'react';
import {observer} from 'mobx-react';
import './App.scss';
import Project from './model/Project';
import Document from './model/Document';
import ProjectGeometricModel from './model/ProjectGeometricModel';

const project: Project = new Project();
const projectGeometricModel = new ProjectGeometricModel(project);

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
					<button onClick={this.onChangeDocument3CoordButtonClick}>Изменить координаты Документ 3</button>
				</div>
				<div>
					<button onClick={this.onReplaceDocument3ButtonClick}>Заместить Документ 3 на новый</button>
				</div>
				<div>
					<button onClick={this.onReplaceDocumentsButtonClick}>Заместить массив документов</button>
				</div>
				<div>
					Документы:
					{
						projectGeometricModel.documentGeometricModels
							.map(({document: {title, coord: {x, y}}}, index) => (
								<div key={index}>{title} [{x}, {y}]</div>
							))
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

	private onChangeDocument3CoordButtonClick = () => {
		project.documents[3 - 1].coord.x = 10;
	};

	private onReplaceDocument3ButtonClick = () => {
		project.documents[3 - 1] = new Document('Документ 3 Замещенный');
	};

	private onReplaceDocumentsButtonClick = () => {
		project.documents = [new Document('Док1')];
	};
};