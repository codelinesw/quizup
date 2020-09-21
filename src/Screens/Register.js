import React from 'react';
import {
 Link
} from  'react-router-dom';
import iconCard from '../images/Register/icono-cedula.svg';
import Header_ from '../Components/Header_';
import cedula from '../images/Alert/cedula-invalida.svg';
import cerrar from '../images/Alert/cerrar.svg';
import mano from '../images/Alert/mano.svg';
export default class Register extends  React.Component{


	constructor(props) {
	  super(props);
	
	  this.state = {
	  	code:'0'
	  };
	}

	SendData(ev){
		ev.preventDefault();
		const { code } = this.state;
		if(code.length > 0){
			let URL = `http://167.114.96.167:3000/api/auth/${code}`;
			fetch(URL)
      		.then(response => response.json())
      		.then(res => {
   				console.log(res);
      			if(Object.keys(res)[0] === 'id' || Object.keys(res)[1] === 'uuid'){
      				//1129566483
      				//console.log(localStorage.getItem('data'));
      				if(localStorage.getItem('data') === 'undefined' || localStorage.getItem('data') === null){
      					localStorage.setItem('data',JSON.stringify({'id':res.id,'uuid':res.uuid,'img':res.urlImage,'name':res.name}));
      					this.props.history.push("/showexams/");
      				}else{
      					localStorage.removeItem('data');
      					localStorage.removeItem('time');
      					localStorage.removeItem('nameQ');
      					localStorage.setItem('data',JSON.stringify({'id':res.id,'uuid':res.uuid,'img':res.urlImage,'name':res.name}));
      					this.props.history.push("/showexams/");
      				}
      			}else{
      				document.querySelector('.window-modal').classList.add('show');
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

	}

	hideMessage(ev){
		ev.preventDefault();
		document.querySelector('.window-modal').classList.remove('show');
	}

	render(){
		return(
			<div className="container-fluid">
				<Header_ />
				<div className="row w-100 d-flex justify-content-center mt-5">
					<div className="col col-md-6 ml-3">
						<div className="input-group mb-3">
						  <div className="input-group-prepend mr-2">
						    <img src={iconCard} width="50" height="50" />
						  </div>
					  	  <input type="text" className="form-control position-relative input-new" placeholder="Ingresa tu número de cédula" aria-label="Username" aria-describedby="basic-addon1" style={{top:'5px'}} onChange={(ev) => this.setState({code:ev.target.value})}/>
						</div>
						<div className="input-button mt-5">
							<button type="button" className="btn btn-new bg-red w-100" onClick={(ev) => this.SendData(ev)}>ENTRAR</button>
						</div>
					</div>
					<div className="window-modal">
						<div className="position-relative text-center mb-5 boxshadow mt-2 p-5 bg-white col-md-5">
							<button type="button" className="btn position-absolute corner-button" onClick={(ev) => this.hideMessage(ev)}><img src={cerrar} width="40" height="40" /></button>
							<h4 className="text-muted mb-3">Su número de cédula no es válido</h4>
							<img src={cedula} width="170" height="170" className="d-block m-auto" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}