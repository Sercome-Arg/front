import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import * as loginAction from '../../store/actions/login'

import storage from '../../config'
import PersonIcon from '@material-ui/icons/Person';
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

		return(
			<header className="white-header">
	
				<nav className="navbar navbar-expand-lg navbar-dark bg-light navbar-white between">
					<a className="navbar-brand-white" href="/home"><img width="70px" src={whiteLogo} alt="" /> </a>
							<p className="welcome-header-white">Bienvenido a <br/><b>Sanofi Cono Sur</b> </p>
						<p className="welcome-message"> Kick Off 2021 Cono Sur | Play to win</p>

						{/* ESTE ES EL BOTON QUE TRAJE DEL DSH */}
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavleft" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
						</button>
					{/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button> */}
					{/* <div className="collapse navbar-collapse align-end" id="navbarNav"> */}
					<div className="align-end" id="navbarNav">
						<ul className="navbar-nav d-none d-sm-none d-md-none d-lg-block">
						<li className="nav-item">
							<Link to='/' onClick={ this.logout }>
								<p className="mb-0 logout"> <PersonIcon/> LOG OUT  </p>
							</Link>
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

