import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import './css/register.css'

import * as registerAction from './../../store/actions/register'

import { Modal } from '../Modal'
import { CountrySelect } from '../CountrySelect'
import { MedioSelect } from '../MedioSelect'


const whiteLogo = require('./img/white-logo.png')

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {
	loginReducer: any,
	registerReducer: any,
	languageReducer: any
}) {
	return {
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer
	};
}

class Register extends React.Component<{}, {
	user: string,
	pass: string,
	email: string,
	name: string,
	surname: string,
	phone: string,
	profession: string,
	survey: string,
	city: string,
	country: string,
	identification_value: string,
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
			email: '',
			name: '',
			surname: '',
			phone: '',
			profession: '',
			survey: '',
			city: '',
			country: '',
			identification_value: '',
		};
	}

	componentWillMount() {
		localStorage.clear()
	}

	get = (e: any) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		})
	}

	register = () => {
		this.props.dispatch(registerAction.registerWithUser(
			this.state.user,
			this.state.pass,
			this.state.email,
			this.state.name,
			this.state.surname,
			this.state.phone,
			this.state.profession,
			this.state.survey,
			this.state.city,
			this.state.country,
			this.state.identification_value,
			true,
		))
		this.modalRef?.current?.click()
	}

	modalAceptar = () => {
		this.closeRef?.current?.click()
		if(this.props?.registerReducer?.fetched || false) {
			this.props.history.push('/')
		}
	}

	render(){

		const { t } = this.props;

		let modalText: string = ''

		if(this.props.registerReducer.fetched) {
			modalText = 'Registro Exitoso! Revisa tu casilla de correo, para validar tu email.'
		} else {
			modalText = this.props?.registerReducer?.data?.message || ''
		}

		return(
			<div>
				<ScrollToTopOnMount />

				<section className="register d-flex align-items-center">
					<div className="container">
						<div className="row ">
							<div className="col-12 d-flex justify-content-center">
								<img className="" src={whiteLogo} alt="" /> 
							</div>
						</div>
						<div className="row ">
							<div className="col-12">
							<div className="register-form">
								<div className="text-center mb-3">
								<h3>¡Bienvenidos!</h3>
								<p>Por favor, completá con tus datos el siguiente formulario.</p>
								</div>
							
								<div className="form-row">
									<div className="form-group col-md-4">
										<label htmlFor="username">Nombre de usuario</label>
										<input onChange={ this.get } name='user' type="text" className="form-control" id="username" />
									</div>
									<div className="form-group col-md-4">
										<label htmlFor="inputPassword4">Contraseña</label>
										<input onChange={ this.get } name='pass' type="password" className="form-control" id="inputPassword4"/>
									</div>
									<div className="form-group col-md-4">
									<label htmlFor="email">Dirección de correo electrónico</label>
									<input onChange={ this.get } name='email' type="text" className="form-control" id="email" placeholder="tuemail@dominio.com.ar" />
									</div>
								</div>
								{/* <div className="form-group">
									<label htmlFor="email">Dirección de correo electrónico</label>
									<input onChange={ this.get } name='email' type="text" className="form-control" id="email" placeholder="tuemail@dominio.com.ar" />
								</div> */}
								<div className="form-row">
									<div className="form-group col-md-5">
										<label htmlFor="name">Nombre</label>
										<input onChange={ this.get } name='name' type="text" className="form-control" id="name"/>
									</div>
									<div className="form-group col-md-5">
										<label htmlFor="surname">Apellido</label>
										<input onChange={ this.get } name='surname' type="text" className="form-control" id="surname"/>
									</div>
									<div className="form-group col-md-2">
										<label htmlFor="inputDNI">DNI</label>
										<input onChange={ this.get } name='identification_value' type="text" className="form-control" id="inputDNI"/>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-4">
										<label htmlFor="phone">Teléfono</label>
										<input onChange={ this.get } name='phone' type="number" className="form-control" id="phone"/>
									</div>
									<div className="form-group col-md-4">
										<label htmlFor="profession">Profesión</label>
										<input onChange={ this.get } name='profession' type="text" className="form-control" id="profession" placeholder=""/>
									</div>
									<div className="form-group col-md-4">
									<label htmlFor="encuesta">¿Cómo nos conociste?</label>
										<MedioSelect onChange={ this.get } name='survey' type="text" className="form-control" id="encuesta" placeholder="Redes sociales, recomendación, publicidad, etc..."/>
									</div>
								</div>
							
								{/* <div className="form-group">
									<label htmlFor="encuesta">¿Cómo nos conociste?</label>
									<MedioSelect onChange={ this.get } name='survey' type="text" className="form-control" id="encuesta" placeholder="Redes sociales, recomendación, publicidad, etc..."/>
									<input onChange={ this.get } name='survey' type="text" className="form-control" id="encuesta" placeholder="Redes sociales, recomendación, publicidad, etc..."/>
								</div> */}
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="inputCity">Ciudad</label>
										<input onChange={ this.get } name='city' type="text" className="form-control" id="inputCity"/>
									</div>
									<div className="form-group col-md-6">
									<label htmlFor="inputState">País</label>
									<CountrySelect onChange={ this.get }/>
									{/* <select onChange={ this.get } name='country' id="inputState" className="form-control">
										<option selected>Choose...</option>
										<option>...</option>
									</select> */}
									</div>
									
								</div>
								<div className="form-row px-1">
										<label htmlFor="inputCity">Elige una foto para tu perfil</label>											
										<div className="form-group col-md-12">
												<input type="file" className="custom-file-input" id="inputGroupFile04"/>
												<label className="custom-file-label" >Imágenes .jpg .png</label>																				
										</div>
								</div>
								<div className="form-group">
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="gridCheck"/>
										<label className="form-check-label">
											Recordar mis datos
										</label>
									</div>
								</div>
								<div className="text-center">
									<button onClick={ this.register } className="btn btn-primary rounded-buttons">Registrarme</button>
									<div className="my-4"><p>O registrate desde <a href="#gmail"><i className="fab fa-google mx-2 init-icons" /> </a> <a href="#face"><i className="fab fa-facebook init-icons"></i></a></p></div>
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
					title={ 'Registro' }
					modalAceptar={ this.modalAceptar }
				/>

			</div>
		);
	}
}

const Export = withTranslation()(Register)

export default connect(mapStateToProps)(Export)
