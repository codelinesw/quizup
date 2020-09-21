import React from 'react';
import {
 Link
} from  'react-router-dom';
import iconCard from '../images/Register/icono-cedula.svg';
import Header_ from '../Components/Header_';
import mano from '../images/Alert/mano.svg';
import cerrar from '../images/Alert/cerrar.svg';

export default class ShowExams extends  React.Component{


	constructor(props) {
	  super(props);
	
	  this.state = {
	  	exams:['']
	  };
	}

	componentDidMount(){
		let data = JSON.parse(localStorage.getItem('data'));
		fetch('http://167.114.96.167/api/getallquizzesbypersonid',{
			headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
			method:'post',
			body:JSON.stringify({
				personId:data.id
			})
		})
		.then(response => response.json())
      	.then(res => {
      		this.setState({exams:res});
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

	getData(qid){
		let data = JSON.parse(localStorage.getItem('data'));
		const { questionId, optionId, initTime } = this.state;
		//http://167.114.96.167/api/addpersontoquiz/
		fetch('http://167.114.96.167/api/isanswered/',{
			 headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
			method:'post',
			body:JSON.stringify({
				uuid:data.uuid,
				quizId:qid
			})
		})
      	.then(response => response.json())
      	.then(res => {
      		console.log(res);
      		if(Object.keys(res)[0] === "answered"){
      			
      			if(res.answered){
      				document.querySelector('.window-modal').classList.add('show');
      				console.log("Ya fue respondido");
      			}else{
      				console.log("Sin responder");
      				this.props.history.push(`/descriptionexam/${qid}/1/`);
      			}
      			//
      		}else{
      			console.log("Sin responder");
      			this.props.history.push(`/descriptionexam/${qid}/1/`);
      			//document.querySelector('.window-modal').classList.add('show');
      		}
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


	hideMessage(ev){
		ev.preventDefault();
		document.querySelector('.window-modal').classList.remove('show');
	}

	render(){
		const { exams } = this.state;
		let name = (localStorage.getItem('data')  === undefined || localStorage.getItem('data') === null) ? "Andrea" : JSON.parse(localStorage.getItem('data')).name;
		return(
			<div className="container-fluid">
				<Header_ showImage={true} />
				<div className="row w-100 d-flex justify-content-center position-relative" style={{top:'-35px'}}>
					<div className="col col-md-6 moveleft">
						<div className="text-center">
							<h2 className="text-muted mb-0">Bienvenido(a)</h2>
							<h2 className="text-muted mb-0">{name}</h2>
							<h2 className="text-muted mb-0">selecciona el quiz.</h2>
						</div>
						{exams.map((item , index) => {
							console.log(item);
							if(item !== '' || item != ''){
								return(<div className="input-group mb-2 mt-3">
						  			<button type="button" className="btn btn-new bg-blue-dark- w-100" onClick={(ev) => this.getData(1)}>{item.name.toUpperCase()}</button>
								</div>);
							}else{
								return(<div className="input-group mb-2 mt-3"><p>cargando...</p></div>)
							}
						})}
						<div className="input-group mb-2">
						  <Link to="/showexams/" className="btn btn-new bg-gray-dark w-100">QUIZ SEGUNDO SEMESTRE 2020</Link>
						</div>
						<div className="input-group mb-2">
						  <Link to="/showexams/" className="btn btn-new bg-gray-dark w-100">COLGATE PERIOGARD</Link>
						</div>
						<div className="input-group mb-2">
						  <Link to="/showexams/" className="btn btn-new bg-gray-dark w-100">COLGATE ORTHOGARD</Link>
						</div>
						<div className="input-group mb-2">
						  <Link to="/showexams/" className="btn btn-new bg-gray-dark w-100">COLGATE SENSITIVE</Link>
						</div>
						<div className="input-group mb-2">
						  <Link to="/showexams/" className="btn btn-new bg-gray-dark w-100">COLGATE TOTAL</Link>
						</div>						
						<div className="input-button mt-5">
							<Link to="/showresultexams" type="button" className="btn btn-new bg-red w-100">REVISA TUS RESULTADOS</Link>
						</div>
					</div>
					<div className="window-modal">
						<div className="position-relative text-center mb-5 boxshadow mt-2 p-5 bg-white col-md-5">
							<button type="button" className="btn position-absolute corner-button" onClick={(ev) => this.hideMessage(ev)}><img src={cerrar} width="40" height="40" /></button>
							<h4 className="text-muted mb-3">El quiz seleccionado ya fue respondido</h4>
							<img src={mano} width="170" height="170" className="d-block m-auto" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}