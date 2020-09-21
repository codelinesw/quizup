import React from 'react';
import {
 Link
} from  'react-router-dom';
import ButtonNext from '../images/Footer/button-next.svg';
import ButtonPrev from '../images/Footer/button-prev.svg';


export default class Footer extends  React.Component{


	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		const { ShowBtnPrev } = this.props;

		return(
			<footer className="header-main w-100 d-flex justify-content-center position-relative" style={{top:'-10px'}}>
				{ ShowBtnPrev ?
					<Link to="/showexams//" className="btn bg-transparent"><img src={ButtonPrev} width="50" height="50" /></Link> 
					: <button type="button" className="btn bg-transparent"><img src={ButtonNext} width="50" height="50" /></button> 
				}
			</footer>
		);
	}
}