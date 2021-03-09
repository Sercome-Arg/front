import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import { Dashboard } from './../Dashboard'
import { Navbar } from './../Navbar'
import { Permission } from '../Permission'

import PERMISSIONS from './../config'

import './css/home.css'

const whiteLogo = require('./img/white-logo.png')
const bgHome = require('./img/bg-home.jpg')
const userPhoto = require('./img/user.jpg')

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {
	loginReducer: any,
	registerReducer: any,
	languageReducer: any,
	subscriptionReducer: any,
	userReducer: any,
	permissionReducer: any,
	appReducer: any,
}) {
	return {
		appReducer: store.appReducer,
		permissionReducer: store.permissionReducer,
		userReducer: store.userReducer,
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
	};
}

class Home extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
	allowed: boolean
}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {
			classSidebar: '',
			classButton: 'navbar-btn',
			allowed: true
		};
	}

	collapse = () => {
	
		if (this.state.classSidebar === ''){
			this.setState({
				classSidebar: 'active',
				classButton: 'navbar-btn active'
			})
		} else {
			this.setState({
				classSidebar: '',
				classButton: 'navbar-btn'
			})
		}

	}

	render(){

		const { t } = this.props;

		let color: string = '#5600c2'

		if(this.props.appReducer.color !== '') {
			color = this.props.appReducer.color
		}

		return(
			<div>
				<Permission permission={ PERMISSIONS.viewHome } { ...this.props }/>
				<ScrollToTopOnMount />
				<div className="wrapper">
					<Dashboard classSidebar={ this.state.classSidebar } />

				{/* <!-- Page Content Holder --> */}
			<div id="content">
			<div className="container-fluid">
				<Navbar classButton={ this.state.classButton } userPhoto={ userPhoto } collapse={ this.collapse } />
				<div className="row">
					<div className="col-12">
						<div className="welcome-text">
							<span style={{ color: color }} className="section-topname"><i className="fas fa-home mr-1"></i> Campus WingCamp</span>
							<div className="divider-line"></div>
							<h2 className="section-title">¡Hola { this.props.userReducer.data.user || '' }! Te espera un universo de herramientas para transmitir tus conocimientos.</h2>
							<p className="section-subtitle">Desde el panel izquierdo podrás crear y administrar tus cursos.</p>
						</div>
					</div>
						<div className="col-12">
						<div className="image-container">
						<img className="img-home img-fluid" src={bgHome} alt="" /> 
						</div>
						</div>
						<div className="col-12">
							<div className="bottom-text">
								<h4 className="bottom-text-thanks">¡Muchas gracias por unirte a la comunidad WingCamp, { this.props.loginReducer?.data?.user?.user || '' }!</h4>
								<span className="bottom-text-subtitle">Antes de terminar, ayudanos a seguir creciendo.</span>
								<p className="bottom-text-calification">Dejar una calificación sobre la nueva plataforma de WingCamp</p>
							</div>
						</div>
					</div>
							<div className="line"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const Export = withTranslation()(Home)

export default connect(mapStateToProps)(Export)