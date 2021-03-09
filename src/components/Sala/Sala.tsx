import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'

import * as subscriptionAction from '../../store/actions/subscription'
import * as appAction from '../../store/actions/app'
import * as userAction from '../../store/actions/user'

import { SalasForm } from '../Sala'
import { SalasTable } from '../Sala'
import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'

import storage from '../../config'

import './css/salaconfig.css'

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
}) {
	return {
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
	};
}

class Home extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
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
		};
	}

	componentDidUpdate() {
		if(
			localStorage.getItem(config.session_token) === undefined ||
			localStorage.getItem(config.session_token) === null
		) {
			// this.props.history.push('/login')
		} else {
			if(this.props.subscriptionReducer.fetched) {
				if(this.props.subscriptionReducer.status === 200) {
					
					let subscriptions: any[] = this.props.subscriptionReducer.data
					let lastSubscription: number = 0

					if(subscriptions !== undefined) {
						subscriptions.map((subscription: any) => {
	
							if(lastSubscription < subscription.end) {
								lastSubscription = subscription.end
							}
	
						})
					}

					if(Date.parse(new Date().toString()) > lastSubscription) {
						this.props.history.push('/subscription')
						//localStorage.clear()
						// this.props.dispatch(loginAction.reintentar())
					}

				}
			}
		}
	}

	componentWillMount() {
		this.props.dispatch(subscriptionAction.get(localStorage.getItem(storage.session_user)))
		this.props.dispatch(appAction.reintentar())

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
										<span className="section-topname"><i className="fas fa-video mr-1"></i> Configurar sala</span>
										<div className="divider-line"></div>
											<h2 className="section-title">Configuración de nueva salas de Zoom</h2>
											<p className="section-subtitle">Desde esta sección podrás configurar las salas de Zoom para tus clases online. Ingresa las credenciales correspondientes a la sala que desees crear:</p>
										</div>
									</div>
									<div className="col-12">
										<div className="welcome-text">
											<SalasForm/>
										<div className="d-flex justify-content-center">
											<button	className="btn btn-primary rounded-buttons my-4">Guardar sala</button>
										</div>
											<SalasTable/>
										</div>
									</div>
									<Footer />
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