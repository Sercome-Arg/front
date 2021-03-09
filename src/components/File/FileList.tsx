import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'

import * as subscriptionAction from '../../store/actions/subscription'
import * as linkAction from '../../store/actions/link'
import * as appAction from '../../store/actions/app'
import * as fileAction from '../../store/actions/file'

import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'

import storage from '../../config'

import './css/salaconfig.css'
import { FileSearch, FileTable } from '.';

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
	courseReducer: any,
	linkReducer: any,
	fileReducer: any,
}) {
	return {
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
		courseReducer: store.courseReducer,
		linkReducer: store.linkReducer,
		fileReducer: store.fileReducer,
	};
}

class FileList extends React.Component<{}, {
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
			this.props.history.push('/')
		} else {
			if(this.props.subscriptionReducer.fetched) {
				if(this.props.subscriptionReducer.status === 200) {
					
					let subscriptions: any[] = this.props.subscriptionReducer.data
					let lastSubscription: number = 0

					if(subscriptions !== undefined) {
						subscriptions.map((subscription: any) => {
							if(lastSubscription < subscription.end) lastSubscription = subscription.end
						})
					}

					if(Date.parse(new Date().toString()) > lastSubscription) this.props.history.push('/subscription')

				}
			}
		}
	}

	componentWillMount() {
		this.props.dispatch(subscriptionAction.get(localStorage.getItem(storage.session_user)))
		this.props.dispatch(appAction.reintentar())
		this.props.dispatch(fileAction.reintentar())

		this.props.dispatch(fileAction.getFiles())
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

		let fileList: any[] = []
		let color: string = '#5600c2'

		if(this.props.fileReducer.fetched) {
			fileList = this.props.fileReducer.data
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
										<span style={{ color: color }} className="section-topname"><i className="fas fa-folder mr-1"></i> Mis materiales</span>
										<div className="divider-line"></div>
											<h2 className="section-title">Lista de materiales y archivos</h2>
											<p className="section-subtitle">Desde esta sección podrás buscar, ver y editar los archivos subidos hasta el momento.</p>
										</div>
									</div>
									<div className="col-12">
										<div className="welcome-text">
											<FileSearch />
											<FileTable fileList={ fileList } />
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

const Export = withTranslation()(FileList)

export default connect(mapStateToProps)(Export)