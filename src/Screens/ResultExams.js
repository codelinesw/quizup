import React from 'react';

import iconCard from '../images/Register/icono-cedula.svg';
import Header_ from '../Components/Header_';

export default class ResultExams extends  React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:[''],
	  	correct:'0',
	  	incorrect:'0',
	  	noAnswer:'0'
	  };
	}

	componentDidMount(){
		this.getData();
		this.setData();
	}

	IsJsonString(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
    	return true;
	}

	getData(){
		let data = JSON.parse(localStorage.getItem('data'));
		const { questionId, optionId, initTime } = this.state;
		//5,"uuid":"22790794
		fetch('http://167.114.96.167/api/getanswers/',{
			 headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
			method:'post',
			body:JSON.stringify({
				personId:data.id,
				qId:1
			})
		})
      	.then(response => response.json())
      	.then(res => {
      		console.log(res);
      		this.setState({data:res});
      		let correct = 0;
      		let incorrect = 0;
      		let noAnswer = 0;
      		res.map((item, index) => {

      			if(item.respuestas.length > 0){
					console.log(item.respuestas[0].answerEndTime);
					if(item.respuestas[0].opcionesrespuestum.isCorrect){
						correct++;
					}else{
						incorrect++;
					}
				}else{
					noAnswer++;
				}
			});
			//this.setState({correct:correct,incorrect:incorrect,noAnswer:noAnswer});
			let data = localStorage.getItem('time') ? localStorage.getItem('time') : 0;
			data = this.IsJsonString(localStorage.getItem('time')) ? JSON.parse(localStorage.getItem('time'))[0].endTime  : 0;
			document.querySelector('.input-correct').value = correct; 
			document.querySelector('.input-incorrect').value = incorrect;
			document.querySelector('.input-noanswer').value = noAnswer;
			let endtime_ = data.split(':');
			let inittime_ = '00:35:59'.split(':');
			let nm = parseInt(inittime_[1])-parseInt(endtime_[1]);
			let ns = parseInt(inittime_[2])-parseInt(endtime_[2]);
			nm = (nm < 10) ? `0${nm}` : nm;
			ns = (ns < 10) ? `0${ns}` : ns;
			console.log(data);
			document.querySelector('.input-time').value = `00:${nm}:${ns}`;
			//console.log(`La cantidad de respuestas correctas son ${correct} y las incorrectas ${incorrect} y sin responder ${noAnswer}`);
      		//this.setState({title: res.pregunta.text,responses:res.opciones,option:res.pregunta.answerType,count_:(parseInt(this.state.count_)+1),isLatest:res.pregunta.isLatest});
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

	setData(){
		const { data } = this.state;
		console.log('hola');
		
	}

	render(){
		return(
			<div className="container-fluid">
				<Header_ showImage={true} />
				<div className="row w-100 d-flex justify-content-center position-relative" style={{top:'-35px'}}>
					<div className="col col-md-6 moveleft">
						<div className="text-center">
							<h4 className="text-muted mb-0">Resultados</h4>
							<h4 className="text-muted mb-0">QUIZ PRIMER SEMESTRE</h4>
							<h4 className="text-muted mb-0">2020</h4>
						</div>
						<div className="form-group text-center position-relative mt-3" style={{marginBottom:'2px'}}>
						  <label htmlFor="exampleInputEmail1" className="text-muted" style={{fontSize:'20px'}}>Tiempo total:</label>
						  <input type="email" className="form-control input-news input-time" id="exampleInputEmail1" aria-describedby="emailHelp" style={{textAlign:'center'}} readOnly />						    
						</div>
						<div className="form-group text-center" style={{marginBottom:'2px'}}>
						  <label htmlFor="exampleInputEmail1" className="text-muted" style={{fontSize:'20px'}}>Respuestas correctas:</label>
						  <input type="email" className="form-control input-news input-correct" id="exampleInputEmail1" aria-describedby="emailHelp" style={{textAlign:'center'}} readOnly/>						    
						</div>
						<div className="form-group text-center" style={{marginBottom:'2px'}}>
						  <label htmlFor="exampleInputEmail1" className="text-muted" style={{fontSize:'20px'}}>Respuestas incorrectas:</label>
						  <input type="email" className="form-control input-news input-incorrect" id="exampleInputEmail1" aria-describedby="emailHelp" style={{textAlign:'center'}} readOnly/>						    
						</div>
						<div className="form-group text-center" style={{marginBottom:'2px'}}>
						  <label htmlFor="exampleInputEmail1" className="text-muted" style={{fontSize:'20px'}}>Respuestas no respondidas:</label>
						  <input type="email" className="form-control input-news input-noanswer" id="exampleInputEmail1" aria-describedby="emailHelp" style={{textAlign:'center'}} readOnly="true"/>						    
						</div>																		
						<div className="input-group mb-2 mt-4">
						  <button type="button" className="btn btn-new bg-red w-100">JUSTIFICACIÓN RESPUESTAS</button>
						</div>					
					</div>
				</div>
			</div>
		);
	}
}