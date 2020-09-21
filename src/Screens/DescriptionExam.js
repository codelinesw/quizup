import React from 'react';
import {
 Link
} from  'react-router-dom';
import iconCard from '../images/Register/icono-cedula.svg';
import Header_ from '../Components/Header_';
import Footer from '../Components/Footer';

export default class DescriptionExam extends  React.Component{


	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	getQuestions(ev){
		ev.preventDefault();
		this.props.history.push("/showexams/");
	}

	InitExam(ev){
		ev.preventDefault();
		let url = 'http://167.114.96.167/api/addpersontoquiz/';
		let data = JSON.parse(localStorage.getItem('data'));
		let q = (this.props.match.params.question!== undefined || this.props.match.params.question !== null) ? this.props.match.params.question : 1;
		let e = (this.props.match.params.exam!== undefined || this.props.match.params.exam !== null) ? this.props.match.params.exam : 1;
		let nameQ = document.querySelector('.name-q').textContent;
      	localStorage.setItem('nameQ',nameQ);
      	this.props.history.push(`/showquestions/${q}/${e}/`);
		fetch(url,{
			 headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
			method:'post',
			body:JSON.stringify({
				uuid:data.uuid,
				quizId:q
			})
		})
      	.then(response => response.json())
      	.then(res => {
      		console.log(res);
      		this.props.history.push(`/showquestions/${q}/${e}/`);
      	},(error) => {
		  	 console.log(error);
		}).catch(function(error) {
		    alert(
		      error.message
		    );

		  // ADD THIS THROW error
		  throw error;
		});	
	}
	
	render(){
		const { match } = this.props;
		return(
			<div className="container-fluid">
				<Header_ showImage={true} />
				<div className="row w-100 d-flex justify-content-center position-relative mb-0" style={{top:'-35px',overflowX:'hidden'}}>
					<div className="col position-relative moveleft">
						<div className="text-center mb-5">
							<h5 className="text-muted mb-0 name-q">QUIZ PRIMER SEMESTRE 2020</h5>
						</div>
						<div className="text-center mt-3">
							<p className="text-muted mb-0" style={{fontSize:'20px',marginTop:'-25px'}}>Seleccionaste el quiz</p>
							<p className="text-muted mb-0" style={{fontSize:'20px'}}>PRIMER SEMESTRE 2020,</p>
							<p className="text-muted mb-0" style={{fontSize:'20px'}}>una vez hayas dado</p>
							<p className="text-muted mb-0" style={{fontSize:'20px'}}>INICIAR QUIZ UP, tienes</p>
							<p className="text-muted mb-0 font-weight-bold" style={{fontSize:'20px'}}>30 minutos</p>
							<p className="text-muted mb-0" style={{fontSize:'20px'}}>para responder tu</p>
							<p className="text-muted mb-0" style={{fontSize:'20px'}}>QUIZ UP COLGATE.</p>
						</div>
						<div className="text-center mt-4">
							<p className="text-muted mb-0" style={{fontSize:'20px'}}>Verifica que tienes el tiempo</p>
							<p className="text-muted mb-0" style={{fontSize:'20px'}}>disponible para realizarlo y</p>
							<p className="text-muted mb-0" style={{fontSize:'20px'}}>la conexión adecuada</p>
							<p className="text-muted mb-3" style={{fontSize:'20px'}}>de red wifi o datos.</p>
						</div>																		
						<div className="input-button mt-4">
							<button type="button" className="btn btn-new bg-red button-desktop" onClick={(ev) => this.InitExam(ev)}>INICIAR QUIZ UP</button>
						</div>
					</div>
				</div>
				<Footer ShowBtnPrev={true} />
			</div>
		);
	}
}