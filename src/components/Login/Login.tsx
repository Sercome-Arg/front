import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import config from './../../config'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import * as loginAction from './../../store/actions/login'
import * as subscriptionAction from './../../store/actions/subscription'
import * as userAction from './../../store/actions/user'

import { Modal } from '../Modal'
import { AgendaGral } from '../Home'

import './css/login.css'

import Spinner from 'react-bootstrap/Spinner'

import { Navbar } from './../Navbar'
import { Footer } from './../Footer'

const whiteLogo = require('./img/white-logo.png')
const loginBg = require('./img/login-bg.png')
const Slide1 = require('./img/slider1.jpg')
const Slide2 = require('./img/slider2.jpg')
const Slide3 = require('./img/slider3.jpg')
const Slide4 = require('./img/slider4.jpg')
const Deco = require('./img/deco.png')
const Deco1 = require('./img/deco1.png')

const wspIcon = {
	color: '#79d852'
  };

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
}) {
	return {
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
	};
}

class Login extends React.Component<{}, {
	user: string,
	pass: string,
	modal: boolean,
	verified: boolean,
}> {

	props: any
	static propTypes: any
	static defaultProps: any

	private modalRef: React.RefObject<HTMLButtonElement>;
	private closeRef: React.RefObject<HTMLButtonElement>;

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.modalRef = React.createRef();
		this.closeRef = React.createRef();
		this.state = {
			user: '',
			pass: '',
			modal: false,
			verified: false,
		};
	}

	componentWillMount() {
		localStorage.clear()
		this.props.dispatch(loginAction.reintentar())
		this.setState({
			user: '',
			pass: '',
			modal: false,
			verified: false,
		})
	}

	componentDidUpdate(){

    if(!(localStorage.getItem(config.session_token) !== undefined && localStorage.getItem(config.session_token) !== null)) {
      if(this.props.loginReducer.fetched) {
        if(this.props.loginReducer.status === 200) {
          let sessionId: string = this.props.loginReducer?.data?.session?._id || null
          let token: string = this.props.loginReducer?.data?.token?.token || null
					let userId: string = this.props.loginReducer?.data?.user?._id || null

          localStorage.setItem(config.session_token, token)
          localStorage.setItem(config.session_id, sessionId)
					localStorage.setItem(config.session_user, userId)

					this.props.dispatch(userAction.get(userId))

					// let verified: boolean = this.props.loginReducer?.data?.user?.mailVerified || false

					// if(this.state.verified) {
					// 	if(!verified) this.setState({ verified: false })
					// } else {
					// 	if(verified) this.setState({ verified: true })
					// }
					
					if(
						!this.props.subscriptionReducer.fetched &&
						!this.props.subscriptionReducer.fetching
					) {
						this.props.dispatch(subscriptionAction.get(userId))
					}

        } else {
					
        }
      }
		}
	}

	get = (e: any) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		})
	}

	login = () => {
		this.props.dispatch(loginAction.login(
			this.state.user.toLowerCase(),
			'infosanofi'
		));
		
	}

	loginInvite = () => {

		this.props.dispatch(loginAction.loginWithUser(
			'invitado',
			'password1234'
		));
		this.setState({
			modal: true
		})
		this.modalRef?.current?.click()
		
	}

	modalAceptar = () => {

		if(this.props.loginReducer.fetched) {
			if(this.props.loginReducer.status === 200) {
				
				// if(this.state.verified) this.props.history.push('/home')
				this.props.history.push('/home')

			} else {
				this.props.dispatch(loginAction.reintentar())
				localStorage.clear()
			}
		} else {
			this.props.dispatch(loginAction.reintentar())
			localStorage.clear()
		}
		this.closeRef?.current?.click()
		this.setState({
			modal: false
		})
	}

	button = () => {

		if(this.props.loginReducer.fetching) {
      return <button disabled className="btn btn-primary violet-buttons">    
				<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
			</button>
    } else {
      if(this.props.loginReducer.fetched) {
				if(!this.state.modal && this.props.loginReducer.status !== 0) {
					this.setState({ modal: true })
					this.modalRef?.current?.click()
				}
				return <button className="btn btn-primary violet-buttons">Bienvenido</button>
      } else {
				if(!this.state.modal && this.props.loginReducer.status !== 0) {
					this.setState({ modal: true })
					this.modalRef?.current?.click()
				}
        return <button onClick={ this.login } className="btn btn-primary violet-buttons">Ingresar</button>
      }
		}
	}

	render(){

		const { t } = this.props;

		let modalText: string = '¡Bienvenido al Kick Off 2021!'

		if(this.props.loginReducer.fetched) {
			// if(!this.state.verified) {
			// 	modalText = 'El mail no se encuentra verificado. Revisa tu casilla de correo.'
			// }
		} else {
			modalText = this.props?.loginReducer?.message || ''
		}

		return(
			<div>
		
			<ScrollToTopOnMount />
			<Navbar/>
			<section>
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					{/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
					{/* <li data-target="#carouselExampleIndicators" data-slide-to="3"></li> */}
				</ol>
				<div className="carousel-inner">
					<div className="carousel-item active">
					<div className="w-100 slide1"> 
							{/* <div className="text-left-container">
							<h1>HOLA</h1>
							</div> */}
							<div className="container">
								<div className="row">
									<div className="col-12 col-md-7">
										<h1 className="big-titles">Bienvenido al Kick Off 2021 de Sanofi Cono Sur</h1>
										<div className="d-flex justify-content-end">
											<div>
										<img className="decoLogin" src={Deco} alt=""/></div> </div>
									</div>
								</div>
							</div>
					</div>
					</div>
					{/* <div className="carousel-item">
					<div className="w-100 slide2"> </div>
					</div> */}
					<div className="carousel-item">
					<div className="w-100 slide3">
					<div className="container">
								<div className="row">
									<div className="col-12 col-md-7">
										<h1 className="big-titles white-text">Bienvenido al Kick Off 2021 de Sanofi Cono Sur</h1>
										<div className="d-flex justify-content-end">
											<div>
										<img className="decoLogin" src={Deco} alt=""/></div> </div>
									</div>
								</div>
							</div> </div>
					</div>
					{/* <div className="carousel-item">
					<div className="w-100 slide4"> </div>
					</div> */}
				</div>
				<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
				</div>
			</section>

			<section className="login-agenda" id="agenda">
			<div className="container">
								<div className="row align-items-center">
									<div className="col-3 col-md-2 col-lg-1 col-xl-1 mb-3">
									<img className="deco-arrow" src={Deco1} alt=""/>
									</div> 
									<div className="col-4 col-md-3 col-lg-2 col-xl-2 mb-3">
									<h4 className="white-titles mb-0">Acceso</h4>
									</div> 
									<div className="col-12 col-md-7 col-lg-7 col-xl-5 d-flex wrap-elements mb-3">
									<input required onChange={ this.get } name='user' className="input-login" type="text" id="username" placeholder="Ingresá tu email Sanofi"/>

									<div className="mx-4 margin-responsive">
										{
											this.button()
										}
									</div>
									</div> 
									<div className="col-12 col-md-12 col-lg-10 col-xl-4 d-flex align-items-center">
									<p className="mb-0 help-text">Si tiene problemas para acceder al sitio, contactese con nuestra mesa de ayuda por WhatsApp al <a href="https://api.whatsapp.com/send?phone=541123800546" target="blank"
									 className="white-text">+54 9 11 23800546</a> o al email <a href="mailto:helpdesk@kickoff2021conosur.com" className="white-text"> helpdesk@kickoff2021conosur.com</a></p>
									<WhatsAppIcon style={wspIcon} fontSize="large"/>
									</div> 
							
								</div>
								<div className="row">
									<div className="col-12 text-center">
										<div className="agenda">
												<h4 className="white-titles">Agenda general</h4>															
										</div>
									</div>							
								</div>
								<AgendaGral/>
							</div>

			</section>
			<Footer/>
	
			{/* DISPLAY NONE */}
			<div className="form-row no-visible">
				<div className="form-group col-12">
					<label htmlFor="email">Contraseña</label>
					<input required onChange={ this.get } name='pass' type="password" className="form-control" id="email" value={'infosanofi'} placeholder="Ingresa tu email"/>
				</div>
			</div>
			{/* DISPLAY NONE */}

				<Modal
					modalRef={ this.modalRef }
					closeRef={ this.closeRef }
					modalText={ modalText }
					title={ 'Ingreso' }
					modalAceptar={ this.modalAceptar }
					fetching={ this.props?.loginReducer?.fetching || false }
				/>
			</div>
		);
	}
}

const Export = withTranslation()(Login)

export default connect(mapStateToProps)(Export)