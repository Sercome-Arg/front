import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import config from './../../config'

import * as loginAction from './../../store/actions/login'
import * as subscriptionAction from './../../store/actions/subscription'
import * as userAction from './../../store/actions/user'

import { Modal } from '../Modal'

import './css/login.css'

import Spinner from 'react-bootstrap/Spinner'


const whiteLogo = require('./img/white-logo.png')
const loginBg = require('./img/login-bg.png')


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
		this.props.dispatch(loginAction.loginWithUser(
			this.state.user,
			this.state.pass
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
      return <button disabled className="btn btn-primary rounded-buttons my-4">    
				<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
			</button>
    } else {
      if(this.props.loginReducer.fetched) {
				if(!this.state.modal && this.props.loginReducer.status !== 0) {
					this.setState({ modal: true })
					this.modalRef?.current?.click()
				}
				return <button className="btn btn-primary rounded-buttons my-4">Bienvenido</button>
      } else {
				if(!this.state.modal && this.props.loginReducer.status !== 0) {
					this.setState({ modal: true })
					this.modalRef?.current?.click()
				}
        return <button onClick={ this.login } className="btn btn-primary rounded-buttons my-4">Ingresar</button>
      }
		}
	}

	render(){

		const { t } = this.props;

		let modalText: string = 'Bienvenido a WingCamp ' + this.props?.loginReducer?.data?.user?.user || ''
		modalText = modalText + '!'

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

				<section className="login d-flex align-items-center">
					<div className="container">
						<div className="row ">
							<div className="col-12 d-flex justify-content-center">
								<img className="indexlogo" src={whiteLogo} alt="" /> 
							</div>
						</div>
						<div className="row ">
							<div className="col-12 d-flex justify-content-center">
								<div className="login-form">
									<div className="text-center mb-3">
										<h3>¡Bienvenidos!</h3>
										<p>Por favor, ingresa tus datos para acceder a la plataforma.</p>
									</div>
							
									<div className="form-row">
										<div className="form-group col-12">
											<label htmlFor="username">Nombre de usuario</label>
											<input required onChange={ this.get } name='user' type="text" className="form-control" id="username" placeholder="Ingresa tu usuario"/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-12">
											<label htmlFor="email">Contraseña</label>
											<input required onChange={ this.get } name='pass' type="password" className="form-control" id="email" placeholder="Ingresa tu contraseña"/>
										</div>
									</div>
									<div className="form-group">
										<div className="form-check col-12">
											<input className="form-check-input" type="checkbox" id="gridCheck"/>
											<label className="form-check-label">
												Recordar mis datos
											</label>
										</div>
									</div>
									
									<div className="d-flex justify-content-center">
										{
											this.button()
										}
									</div>
									<div className="mt-2 mb-4 text-center"><p>O inicia sesión desde <a href="#gmail"><i className="fab fa-google mx-2 init-icons" /> </a> <a href="#face"><i className="fab fa-facebook init-icons"></i></a></p></div>
										<img className="login-bg" src={loginBg} alt="" />

									<div className="text-center d-flex flex-wrap justify-content-center">
										<p>
										<Link to="/resetpass" className="login-user-options">
												Olvidé mi contraseña
											</Link>
										</p>
										<p>
											<Link to="/register" className="login-user-options">
												Crear nueva cuenta
											</Link>
											
										</p>
										<p onClick={ this.loginInvite } className="login-user-options">
											{/* <Link to="/register" className="login-user-options"> */}
												Probá nuestra plataforma
											{/* </Link> */}
											
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
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