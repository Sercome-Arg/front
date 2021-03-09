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
	userReducer: any,
}) {
	return {
		userReducer: store.userReducer,
	};
}

class ResetPass extends React.Component<{}, {
	user: string,
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

	resetPass = () => {
		this.props.dispatch(userAction.resetPass(
			this.state.user
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
								<img className="" src={whiteLogo} alt="" /> 
							</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-12 col-md-9">
								<div className="register-form">
									<div className="text-center mb-3">
										<h3>Recuperación de contraseña</h3>
										<p>Por favor, ingresá tu nombre de usuario para recuperar tu contraseña. <b>Si sos estudiante,</b> por favor comunicate con tu profesor para obtener tu nueva contraseña.</p>
									</div>
									<div className="form-row">
										<div className="form-group col-12">
											<input onChange={ this.get } name='user' type="text" className="form-control mt-4" id="username" placeholder="Ingresá tu usuario..." />
										</div>
									</div>
									<div className="text-center">
										<button onClick={ this.resetPass } className="btn btn-primary rounded-buttons mt-4">Recuperar</button>
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

const Export = withTranslation()(ResetPass)

export default connect(mapStateToProps)(Export)
