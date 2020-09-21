import React from 'react';
import {
 Link
} from  'react-router-dom';
import Logo from '../images/Header/Logo-Colgate.svg';
import Slide from '../images/Header/quiz-up.svg';
import Profile from '../images/Header/profile.svg';

export default class Header_ extends  React.Component{


	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		const { showImage } = this.props;
		let data = localStorage.getItem('data');
		return(
			<header className={showImage ? 'header-main w-100' : 'header-main w-100 d-flex justify-content-center'}>
				<ul className={showImage ? 'nav justify-content-between w-100' : 'nav justify-content-between w-70'}>
				  <li className="nav-item">
				    <Link to="/"><img src={Logo}  className={ showImage ? 'position-absolute enable-options-logo' : 'position-absolute disabled-options-logo' }/></Link>
				  </li>
				  <li className="nav-item">
				    <img src={Slide} className={showImage ? "position-relative imgslideshow" : "position-relative imgslidehide"} />
				  </li>
				  {
				  	!showImage && <li className="nav-item">
				    <img src={data === undefined || data === null ? Slide : JSON.parse(data).img} style={{width:'140px',height:'140px',display:'none'}} />
				  </li>
				  }
				 {showImage &&  <li className="nav-item">
				    <img src={data === undefined || data === null ? Profile : JSON.parse(data).img} className="position-relative imgprofile" />
				  </li>}
				</ul>
			</header>
		);
	}
}