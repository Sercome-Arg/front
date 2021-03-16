import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import * as loginAction from './../../store/actions/login'

import storage from './../../config'

import './css/navbar.css'

const whiteLogo = require('./img/white-logo.png')
const blueLogo = require('./img/blue-logo.png')






const userPhoto = require('./img/user.jpg')

function mapStateToProps(store: {
	userReducer: any,
}) {
	return {
		userReducer: store.userReducer,
	};
}

class Navbar extends React.Component<{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	logout = () => {
		localStorage.clear()
		this.props.dispatch(loginAction.reintentar())
	}

	getUserId = () => localStorage.getItem(storage.session_user)

	render(){

		const { t } = this.props;

		let color: string = '#5600c2'

		if(this.props.color !== undefined) {
			color = this.props.color
		}

		return(
			<header>
	
				<nav className="navbar navbar-expand-lg navbar-dark bg-light">
					<a className="navbar-brand" href="#"><img width="70px" src={blueLogo} alt="" /> </a>
							<p className="welcome-header">Bienvenido a <br/><b>Sanofi Cono Sur</b> </p>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
					
						
						<li className="nav-item active">
							<a className="nav-link" href="#agenda">Agenda de actividades <span className="sr-only">(current)</span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link" target="blank" href="https://api.whatsapp.com/send?phone=541123800546">Contacto</a>
						</li>				
						</ul>
					</div>
					</nav>
		
			</header>
		);
	}
}

const Export = withTranslation()(Navbar)

export default connect(mapStateToProps)(Export)

