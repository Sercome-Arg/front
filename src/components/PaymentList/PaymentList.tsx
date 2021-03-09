import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'

import * as subscriptionAction from '../../store/actions/subscription'
import * as userAction from '../../store/actions/user'
import * as paymentAction from '../../store/actions/payment'

import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'

import storage from '../../config'

import './css/PaymentList.css'

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
	paymentReducer: any,
}) {
	return {
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
		paymentReducer: store.paymentReducer,
	};
}

class Home extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
}> {

	props: any
	static propTypes: any
	static defaultProps: any

	private openModal: React.RefObject<HTMLButtonElement>;
	private closeModal: React.RefObject<HTMLButtonElement>;

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.openModal = React.createRef();
		this.closeModal = React.createRef();
		this.state = {
			classSidebar: '',
			classButton: 'navbar-btn',
		};
	}

	componentWillMount() {
		this.props.dispatch(subscriptionAction.get(localStorage.getItem(storage.session_user)))
		this.props.dispatch(paymentAction.getForUser(localStorage.getItem(storage.session_user)))

		let userId: string | null = localStorage.getItem(config.session_user)
		if(localStorage.getItem(config.session_user) === null || localStorage.getItem(config.session_user) === undefined) this.props.history.push('/')
		if(userId !== null) this.props.dispatch(userAction.get(userId))
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

		let paymentList: any[] = []

		if(this.props.paymentReducer.fetched) {
			paymentList = this.props.paymentReducer.data
		}

		return(
			<div>
				<ScrollToTopOnMount />
				<div className="wrapper">
        	<Dashboard classSidebar={ this.state.classSidebar } />
					<div id="content">
						<div className="container-fluid">
				<Navbar classButton={ this.state.classButton } userPhoto={ userPhoto } collapse={ this.collapse } />
				<div className="row">
					<div className="col-12">
						<div className="welcome-text">
							<span className="section-topname"><i className="fas fa-credit-card mr-2"></i>Mis pagos</span>
							<div className="divider-line"></div>
							<h2 className="section-title">Esta es la lista de tus pagos realizados hasta el momento.</h2>
							<p className="section-subtitle">Podrás ver la factura correspondiente a cada uno de ellos.</p>
						</div>
					</div>
						<div className="col-12">
						<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
								<th scope="col">#</th>
								<th scope="col">Estado</th>
								<th scope="col">Descripción</th>
								<th scope="col">Fecha</th>
								<th scope="col">Monto</th>
								<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{
									paymentList.map((payment: {
										idMeli: number,
										meli: {
											description: string,
											transaction_amount: number,
											date_created: Date,
											status_detail: string
										}
									}) => {
										return (
											<tr>
												<th scope="row">{ payment.idMeli }</th>
												<td>{ t(payment.meli.status_detail) }</td>
												<td>{ payment.meli.description }</td>
												<td>{ payment.meli.date_created }</td>
												<td>$ { payment.meli.transaction_amount },00</td>
												<td>
													<a href="">
														<i className="fas fa-file"></i>
														Ver factura
														</a>
												</td>
											</tr>
										)
									})
								}
								
							
							</tbody>
							</table>
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