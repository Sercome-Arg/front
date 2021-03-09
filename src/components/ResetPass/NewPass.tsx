import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import './css/resetpass.css'

import * as userAction from '../../store/actions/user'

import { Modal } from '../Modal'

const whiteLogo = require('./img/white-logo.png')

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {
	userReducer: any
}) {
	return {
		userReducer: store.userReducer
	};
}

class NewPass extends React.Component<{}, {
	pass: string,
	newPass: string,
	disabled: boolean,
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
			pass: '',
			newPass: '',
			disabled: true
		};
	}

	componentWillMount() {
		localStorage.clear()
	}

	getValuePass = (e: any) => {

		let disabled: boolean = true

		if(e.target.value === this.state.newPass) {
			disabled = false
		}

		this.setState({
			...this.state,
			pass: e.target.value,
			disabled: disabled
		})
		
	}

	getValueNewPass = (e: any) => {

		let disabled: boolean = true

		if(e.target.value === this.state.pass) {
			disabled = false
		}

		this.setState({
			...this.state,
			newPass: e.target.value,
			disabled: disabled
		})
	}

	getPass = () => {
		this.props.dispatch(userAction.getPass(
			this.props.match.params.user,
			this.state.pass
		))
		this.modalRef?.current?.click()
	}

	modalAceptar = () => {
		this.closeRef?.current?.click()
		if(this.props?.userReducer?.fetched || false) {
			this.props.history.push('/')
		}
		this.props.dispatch(userAction.reintentar())
	}

	render(){

		const { t } = this.props;

		let modalText: string = this.props?.userReducer?.message || ''

		return(
			<div>
				<ScrollToTopOnMount />
				<section className="reset-pass d-flex align-items-center justify-content-center">
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="col-12 col-md-9 d-flex justify-content-center">
								<img className="" src={ whiteLogo } alt="" /> 
							</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-12 col-md-9">
							<div className="register-form">
								<div className="text-center mb-3">
									<h3>Recuperación de contraseña</h3>
									<p><b>¡Ya casi!</b> Por favor, ingresá una nueva contraseña.</p>
								</div>
								<div className="form-row">
									<div className="form-group col-12 my-1">
										<input onChange={ this.getValuePass } name='pass' type="password" className="form-control" id="inputPassword4" placeholder="Nueva contraseña"/>
									</div>
									<div className="form-group col-12 my-1">
										<input onChange={ this.getValueNewPass } name='newPass' type="password" className="form-control" id="inputPassword4" placeholder="Repetir contraseña"/>
									</div>
									</div>
								<div className="text-center">
									<button disabled={ this.state.disabled } onClick={ this.getPass } className="btn btn-primary rounded-buttons mt-4">Guardar</button>
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
					title={ 'Recuperación de contraseña' }
					modalAceptar={ this.modalAceptar }
					fetching={ this.props?.userReducer?.fetching || false }
				/>
			</div>
		);
	}
}

const Export = withTranslation()(NewPass)

export default connect(mapStateToProps)(Export)
