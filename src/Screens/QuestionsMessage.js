import React from 'react';
import {
 Link
} from  'react-router-dom';
import iconCard from '../images/Register/icono-cedula.svg';
import Header_ from '../Components/Header_';
import Footer from '../Components/Footer';
import Paperplane from '../images/Messages/Questions/AVION.svg';

export default class QuestionsMessage extends  React.Component{


	constructor(props) {
	  super(props);
	
	  this.state = {
	  	count:'0',
	  };
	}



	changeQuestion(ev){
		ev.preventDefault();
		console.log(this.state.count);
		if( this.state.count <= 2 ){
			this.setState({count:parseInt(this.state.count)+1});
		}else{
			alert('hello');
		}
		
	}

	render(){
		const {count , questions } = this.state;
		
		return(
			<div className="container-fluid">
				<Header_ showImage={true} />
				<div className="row w-100 d-flex justify-content-center position-relative mb-0" style={{top:'-35px',overflowY:'hidden'}}>
					<div className="col col-md-5 moveleft">
						<div className="text-center mb-5 boxshadow mt-2 p-5">
							<h4 className="text-muted mb-0">Su COLGATE QUIZ UP ha sido enviado exitosamente</h4>
							<img src={Paperplane} width="170" height="170" className="d-block m-auto" />
						</div>
						<div className="input-button mt-5">
							<Link to="/showexams/" className="btn btn-new bg-red w-100">VOLVER AL HOME</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}