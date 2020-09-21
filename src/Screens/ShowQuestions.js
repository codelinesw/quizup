import React from 'react';
import {
 Link
} from  'react-router-dom';
import iconCard from '../images/Register/icono-cedula.svg';
import Header_ from '../Components/Header_';
import Footer from '../Components/Footer';
import ButtonNext from '../images/Footer/button-next.svg';
import mano from '../images/Alert/mano.svg';
import cerrar from '../images/Alert/cerrar.svg';

export default class ShowQuestions extends  React.Component{


	constructor(props) {
	  super(props);
	
	  this.state = {
	  	count:'0',
	  	questions: [
	  		{
	  			'questions': [
	  				{'number':'1'},
	  				{'title':'El enjuague especializado PERIOGARD es efectivo para ayudar a controlar las condiciones periodontales gracias a su formulación de:'}
	  			],
	  			'answers':  [
	  				{
	  					text:'Clorhexidina al 0.012%'
	  				},
	  				{
	  					text:'Clorhexidina al 0.2% más Flúor'
	  				},
	  				{
	  					text:'Clorhexidina al 0.12%'
	  				},
	  				{
	  					text:'Clorhexidina al 0.12% más CPC al 0.015%'
	  				},
	  			]
	  		},
	  		{
	  			'questions':[
	  				{'number':'2'},
	  				{'title':'La recomendación de uso para el régimen PERIOGARD es:'}
	  			],
	  			'answers':  [
	  				{
	  					text:'Enjuague con 15 ml, 1 minuto, 2 veces/día, por 15 días. Cepillado 3 veces/día, con crema y cepillo PERIOGARD, por tiempo indefinido'
	  				},
	  				{
	  					text:'Enjuague con 10 ml, 60 segundos, 2 veces/día, por 15 días. Cepillado 2 veces/día, con crema y cepillo PERIOGARD, por 6 meses'
	  				},
	  				{
	  					text:'Enjuague con 15 ml, 1 minuto, 3 veces/día, por 15 días. Cepillado 3 veces/día, con crema y cepillo PERIOGARD, por tiempo indefinido'
	  				},
	  				{
	  					text:'Enjuague con 15 ml, 1 minuto, 2 veces/día, por 15 días. Cepillado 2 veces/día, con crema y cepillo PERIOGARD, por tiempo indefinido'
	  				},
	  			]
	  		},
	  		{
	  			'questions':[
	  				{'number':'16'},
	  				{'title':'La fórmula de la crema dental PARODONTAX que anuncia el control del sangrado gingival se diferencia de la crema COLGATE PERIOGARD en:'}
	  			],
	  			'answers':  [
	  				{
	  					text:'Combate microorganismos específicos periodontales'
	  				},
	  				{
	  					text:'Tiene un efecto anti-inflamatorio que reduce el sangrado gingival'
	  				},
	  				{
	  					text:'Previene el sangrado gingival por un efecto antiséptico'
	  				},
	  				{
	  					text:'Controla el sangrado por efectos hemostáticos sin controlar la causa del problema'
	  				},
	  			]
	  		},
	  		{
	  			'questions':[
	  				{'number':'20'},
	  				{'title':'¿Cuál es el ingrediente y el factor de riesgo para el sangrado gingival que la crema dental COLGATE PERIOGARD ayuda a controlar?'}
	  			],
	  			'answers':  [
	  				{
	  					text:'write'
	  				}
	  				
	  			]
	  		}	  			  		
	  	],
	  	count_:'1',
	  	title:'',
	  	responses:[''],
	  	option:'1',
	  	time:'1800',
	  	isLatest:false,
	  	questionId:'0',
	  	qid:'0',
	  	optionId:'0',
	  	initTime:'',
	  	endTime:'',
	  	time_:''

	  };

	  this.interval = '';
	  	  	//time:'2160',
	}

	componentDidMount(){
		document.body.scrollTop = 0;
		this.getData();
		clearInterval(this.interval);
		this.interval = this.startTimer();
		
	}

	getData(){
		const { count_ } = this.state;
		let id = (this.props.match.params.question !== undefined || this.props.match.params.question !== null) ? this.props.match.params.question : 1;
		id = (this.props.match.params.exam !== undefined || this.props.match.params.exam !== null) ? id : 1;
		let URL = `http://167.114.96.167/api/nextquestion/${count_}/1/`;
		//console.log(this.props.match.params);
		fetch(URL)
      	.then(response => response.json())
      	.then(res => {
      		console.log(res);
      		this.setState({title: res.pregunta.text,responses:res.opciones,option:res.pregunta.answerType,isLatest:res.pregunta.isLatest,questionId:res.pregunta.id});
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

	changeOptions(URL){

		fetch(URL)
      	.then(response => response.json())
      	.then(res => {
      		console.log(res);
      		this.setState({title: res.pregunta.text,responses:res.opciones,option:res.pregunta.answerType,count_:(parseInt(this.state.count_)+1),isLatest:res.pregunta.isLatest,questionId:res.pregunta.id});
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

	handleChange(ev,index_,id){
		//const { answers, kindofquestions } = this.state;
		let inputs = document.querySelectorAll('._radios_');
		let ans = inputs[index_].parentElement.children[0].value;
		let text = inputs[index_].parentElement.parentElement.parentElement.children[1].textContent;
		let state = inputs[index_].parentElement.children[0].dataset.question;
		[].forEach.call(inputs, (item , index) => {
			if(inputs[index_].parentElement.children[0].checked){
				inputs[index_].parentElement.children[1].classList.add('_active_');
				inputs[index_].parentElement.children[0].checked = true;
				this.setState({optionId:id});
			}
			if(index_ != index){
				inputs[index].parentElement.children[1].classList.remove('_active_');
				inputs[index].parentElement.children[0].checked = false;
			}
		});
	}

	saveData(ev){
		ev.preventDefault();
		let data = JSON.parse(localStorage.getItem('data'));
		const { questionId, optionId, initTime } = this.state;
		let endtime = `00:${document.querySelector('.time-current').textContent}`;
		fetch('http://167.114.96.167/api/saveanswer/',{
			 headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
			method:'post',
			body:JSON.stringify({
				personId:data.id,
				qId:1,
				questionId:questionId,
				opcionRespuestaId:optionId,
				respuesta: {
					answerText:0,
					answerInitTime:initTime,
					answerEndTime:endtime
				}
			})
		})
      	.then(response => response.text())
      	.then(res => {
      		if(res === 'success'){

      		}else{

      		}
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

	changeQuestion(ev){
		ev.preventDefault();
		console.log(this.state.count);
		const { count_, isLatest} = this.state;
		document.body.scrollTop = 0;
		//console.log(isLatest);
		let count = 0;
		let inputs = document.querySelectorAll('._radios_');
		[].forEach.call(inputs, (item , index) => {
			if(inputs[index].parentElement.children[0].checked){
				count++;
			}
		});

		if(count >= 1){
				if(!isLatest){
					let url = `http://167.114.96.167/api/nextquestion/${(parseInt(this.state.count_)+1)}/1/`;
					this.saveData(ev);
					this.changeOptions(url);
					let currenturl = `/showquestions/${(parseInt(this.state.count_)+1)}/1/`;
					[].forEach.call(inputs, (item , index) => {
						inputs[index].parentElement.children[1].classList.remove('_active_');
						inputs[index].parentElement.children[0].checked = false;
					});
					this.props.history.push(currenturl);
				}else{
					clearInterval(this.interval);
					localStorage.setItem('time',JSON.stringify([{endTime:this.state.time_}]));
					console.log(this.state.time_);
					this.saveData(ev);
					this.props.history.push('/questionsmessage/');
				}
				//console.log('se ha selecciona una respuesta');
		}else{
			//http://167.114.96.167/api/addpersontoquiz/
			console.log('seleccione por lo menos una respuesta');
			document.querySelector('.window-modal').classList.add('show');
		}		
	}

	startTimer(){
		const { time } = this.state;
		let minutes = Math.floor((parseInt(time) / 60));
	    let seconds = Math.floor(59);
	    let contador = 1;
	    if(document.querySelector('.time-current') != null){
	    	//114020
	    	document.querySelector('.time-current').innerHTML = '';
        	document.querySelector('.time-current').innerHTML += (minutes-1) + ':';
	    	document.querySelector('.time-current').innerHTML += seconds;
	    }
	   
	    let m_  = (minutes < 10) ? `0${(minutes-1)}` : `${(minutes-1)}`;
	    let s_  = (seconds < 10) ? `0${seconds}` : seconds;
	    let t_ = `00:${m_}:${s_}`;
	    this.setState({initTime:t_});
	    setInterval(() => {
	    	if(seconds > 0){
	    		seconds = parseInt((seconds-contador));
	    	}else{
	    		seconds = 59;
	    		minutes = parseInt((minutes-contador));
	    	}
	    	if(minutes > 0){
	    		if(document.querySelector('.time-current') != null){
	    			document.querySelector('.time-current').innerHTML = '';
                	document.querySelector('.time-current').innerHTML +=  (minutes < 10) ? `0${(minutes-1)}:` : `${(minutes-1)}:`;
	            	document.querySelector('.time-current').innerHTML += (seconds < 10) ? `0${seconds}` : seconds;
	            }
	            let m  = (minutes < 10) ? `0${(minutes-1)}` : `${(minutes-1)}`;
	            let s  = (seconds < 10) ? `0${seconds}` : seconds;
	            let t = `00:${m}:${s}`;
	            //console.log(t);
	    		this.setState({time_:t});
	    	}else{
	    		this.props.history.push('/');
	    	}
	    	
	    },1000);	    
	}

	hideMessage(ev){
		ev.preventDefault();
		document.querySelector('.window-modal').classList.remove('show');
	}

	render(){
		const {count , questions, count_, title, responses, option, time } = this.state;
		let nameQ = localStorage.getItem('nameQ');
		return(
			<div className="container-fluid">
				<Header_ showImage={true} />
				<div className="row w-100 d-flex justify-content-center position-relative mb-0" style={{top:'-35px',overflowX:'hidden'}}>
					<div className="col moveleft" style={{overflow:'hidden'}}>
						<div className="text-center mb-5">
							<div style={{width:'80%',margin:'auto'}}>
								<h3 style={{color:'#22f32c'}} className="time-current">00:00</h3>
								<hr className="bg-info" />
							</div>
							<h4 className="text-muted mb-0">{nameQ}</h4>
						</div>
						<div className="text-left mt-3 position-relative top-movil">
							<p className="text-muted mb-0 m-auto" style={{fontSize:'17px',marginTop:'-25px'}}>{count_ + '. ' + title}</p>
						</div>
						<div className="text-center mt-3" style={{overflow:'hidden'}}>
						{option == 2 ? <div className="card ml-2">
							<div className="card-header bg-gray-dark">
								<p className="text-light">Para su respuesta tiene un máximo de 256 caracteres</p>
							</div>
							<div className="card-body">
								<textarea className="w-100 textarea-new" rows="4"></textarea>
						</div>
						</div> : responses.map(( item , index ) => {
							return(<div className="mb-1 pr-5 position-relative d-flex" style={{top:'7px'}} key={index+1}>													  
								<div className="input-group-prepend bg-transparent border-0">
									<div className="input-radio mr-2 mt-2 ml-2">
			      						<input type="radio" aria-label="Checkbox for following text input" className="radio_" id={`randomquestions_${index}`} onChange={(ev) => this.handleChange(ev,index,item.id)}/>
			      						<label htmlFor={`randomquestions_${index}`} className="radio bg_new_ _radios_"></label>
			    					</div>					
								</div>
						 		<p className="text-muted position-relative" style={{top:'5px',left:'2px',textAlign:'left'}}>{item.text}</p>
							</div>);
						})}
						</div>																
					</div>
				</div>
				<footer className="header-main w-100 d-flex justify-content-center position-relative" style={{top:'-10px'}}>
				 <button type="button" className="romovefocus" onClick={(ev) => this.changeQuestion(ev)} style={{outline:'none',backgroundColor:'none'}}><img src={ButtonNext} width="50" height="50" /></button> 				
				</footer>
				<div className="window-modal">
					<div className="position-relative text-center mb-5 boxshadow mt-2 p-5 bg-white col-md-5">
						<button type="button" className="btn position-absolute corner-button" onClick={(ev) => this.hideMessage(ev)}><img src={cerrar} width="40" height="40" /></button>
						<h4 className="text-muted mb-3">Para continuar debe de seleccionar una respuesta</h4>
						<img src={mano} width="170" height="170" className="d-block m-auto" />
					</div>
				</div>
			</div>
		);
	}
}