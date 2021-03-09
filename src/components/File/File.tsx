import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'
import moment from 'moment';

import * as subscriptionAction from '../../store/actions/subscription'
import * as userAction from '../../store/actions/user'
import * as courseAction from '../../store/actions/course'
import * as appAction from '../../store/actions/app'
import * as fileAction from '../../store/actions/file'
import * as permissionAction from '../../store/actions/permission'

import { FileForm } from '../File'
import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Modal } from '../Modal'
import { Footer } from '../Footer'

import storage from '../../config'

import './css/salaconfig.css'

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
	fileReducer: any,
	permissionReducer: any,
}) {
	return {
		permissionReducer: store.permissionReducer,
		fileReducer: store.fileReducer,
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
		courseReducer: store.courseReducer,
	};
}

class FileListUrl extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
	url: string,
	course: string,
	name: string,
	file: File | null,
	fileName: string,
	modalText: string
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
			url: '',
			course: '',
			name: '',
			file: null,
			fileName: '',
			modalText: '',
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
		this.props.dispatch(courseAction.reintentar())
		this.props.dispatch(appAction.reintentar())
		this.props.dispatch(fileAction.reintentar())
		this.props.dispatch(courseAction.getCourses())

		let userId: string | null = localStorage.getItem(config.session_user)
		if(localStorage.getItem(config.session_user) === null || localStorage.getItem(config.session_user) === undefined) this.props.history.push('/')
		if(userId !== null) this.props.dispatch(userAction.get(userId))
		if(userId !== null) this.props.dispatch(permissionAction.getPermissionByUser(userId))
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

	get = (e: any) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		})
	}

	saveFile = (enabled: boolean) => {

		this.openModal?.current?.click()

		if(enabled) {
			this.props.dispatch(fileAction.setFile(
				this.state.name,
				this.props.fileReducer?.foto || '',
				this.state.course,
			))
		} else {
			this.setState({
				modalText: 'No está autorizado para realizar esta acción.'
			})
		}
	}

	modalAceptar = () => {

		if(this.props.fileReducer.fetched) {
			this.props.history.push('/fileList')
		}
		this.closeModal?.current?.click()
		this.props.dispatch(fileAction.reintentar())
		this.setState({
			modalText: ''
		})

	}

	getFile = (e: any) => {

		this.props.dispatch(fileAction.upload(e.target.files[0]))
		this.setState({ file: e.target.files[0], fileName: e.target.files[0].name })
	}

	render(){

		const { t } = this.props;

		let modalText: string = ''
		let courseList: any[] = []
		let color: string = '#5600c2'
		let permissions: {
			number: string
		}[] = []
		let BASE: any = {}

		let fileCreateEnabled: boolean = false

		if(this.props.fileReducer.fetched) {
			modalText = 'Archivo añadido exitosamente: ' + this.state.name
		} else {
			if(this.state.modalText !== '') {
				modalText = this.state.modalText
			} else {
				modalText = this.props?.fileReducer?.message || ''
			}
		}

		if (this.props.courseReducer.fetched){
			courseList = this.props.courseReducer.data
		}

		if(this.props.permissionReducer) {
			permissions = this.props.permissionReducer.data
			BASE = this.props.permissionReducer.base
		}

		if(Array.isArray(permissions)) {
			permissions.map((permission: {
				number: string
			}) => {
				if(permission.number === BASE.createFile) fileCreateEnabled = true
			})
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
											<span style={{ color: color }} className="section-topname"><i className="fas fa-folder mr-1"></i> Añadir material</span>
											<div className="divider-line"></div>
												<h2 className="section-title">Configuración de nuevo archivo</h2>
												<p className="section-subtitle">Desde esta sección podrás añadir nuevo material a tus cursos. Ingresa los datos correspondientes al material que desees agregar:</p>
											</div>
										</div>
										<div className="col-12">
											<div className="welcome-text">
												<FileForm
													getValue={ this.get }
													courseList={ courseList }
													getFile={ this.getFile }
													fileName={ this.state.fileName }
												/>
											<div className="d-flex justify-content-center">
												<button onClick={ () => this.saveFile(fileCreateEnabled) } className="btn btn-primary rounded-buttons my-4">Guardar archivo</button>
											</div>
										</div>
									</div>
									<Footer />
								</div>
							<div className="line"></div>
						</div>
					</div>
				</div>
				<Modal
					modalRef={ this.openModal }
					closeRef={ this.closeModal }
					modalText={ modalText }
					title={ 'Archivos' }
					modalAceptar={ this.modalAceptar }
					fetching={ this.props?.fileReducer?.fetching || false }
				/>
			</div>
		);
	}
}

const Export = withTranslation()(FileListUrl)

export default connect(mapStateToProps)(Export)