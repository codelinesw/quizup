import React from 'react';
import {
 Link
} from  'react-router-dom';
import iconCard from '../images/Register/icono-cedula.svg';
import Header_ from '../Components/Header_';

export default class ShowResultExams extends  React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		return(
			<div className="container-fluid">
				<Header_ showImage={true} />
				<div className="row w-100 d-flex justify-content-center position-relative" style={{top:'-35px'}}>
					<div className="col col-md-6 moveleft">
						<div className="text-center">
							<h2 className="text-muted mb-0">Resultados</h2>
							<h2 className="text-muted mb-0">Colgate Quiz UP</h2>
						</div>
						<div className="input-group mb-2 mt-5">
						  <Link to="/resultexams" className="btn btn-new bg-gray-dark bg-blue-dark- w-100">QUIZ PRIMER SEMESTRE 2020</Link>
						</div>					
					</div>
				</div>
			</div>
		);
	}
}