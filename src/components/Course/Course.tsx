import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'
import moment from 'moment';

import * as subscriptionAction from '../../store/actions/subscription'
import * as userAction from '../../store/actions/user'
import * as permissionAction from '../../store/actions/permission'
import * as courseAction from '../../store/actions/course'
import * as appAction from '../../store/actions/app'

import { CoursesForm } from '../Course'
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
	appReducer: any,
	permissionReducer: any,
}) {
	return {
		permissionReducer: store.permissionReducer,
		appReducer: store.appReducer,
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
		courseReducer: store.courseReducer,
	};
}

class Course extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
	name: string,
	price: string
	end: Date | null,
	start: Date | null
	description: string,
	caratula: File | null,
	logo: File | null,
	color: string,
	modalText: string,
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
			name: '',
			price: '',
			end: null,
			start: null,
			description: '',
			caratula: null,
			logo: null,
			color: '',
			modalText: ''
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
		if(e.target.name === 'end' || e.target.name === 'start') {
			let now: string = e.target.value + ' 00:00 +0000'
			this.setState({
				...this.state,
				[e.target.name]: moment(e.target.value).utc().format('YYYY-MM-DDTHH:mm:ssZ')
			})
		} else {
			this.setState({
				...this.state,
				[e.target.name]: e.target.value
			})
		}
	}

	getFile = (e: any) => {

		let caratula: File | null = null
		let logo: File | null = null

		if(e.target.files !== undefined) {
			if(e.target.name === 'caratula') {
				caratula = e.target.files[0]
				if (caratula !== null) {
					this.props.dispatch(courseAction.uploadCaratula(caratula))
					this.setState({ caratula: e.target.files[0] })
				}
			}
			if(e.target.name === 'logo') {
				logo = e.target.files[0]
				if (logo !== null) {
					this.props.dispatch(courseAction.uploadLogo(logo))
					this.setState({ logo: e.target.files[0] })
				}
			}
		}
	}
	
	getColor = (color: any) => {
		this.setState({ color: color })
		this.props.dispatch(appAction.setColor(color))
	}

	saveCourse = (enabled: boolean) => {

		this.openModal?.current?.click()

		if(enabled) {
			let caratula: string = ''
			let logo: string = ''

			caratula = this.props.courseReducer?.caratula || ''
			logo = this.props.courseReducer?.logo || ''

			this.props.dispatch(courseAction.setCourse(
				this.state.name,
				this.state.description,
				parseInt(this.state.price, 10),
				this.state.start,
				this.state.end,
				this.state.color,
				caratula,
				logo
			))
		} else {
			this.setState({
				modalText: 'No está autorizado para realizar esta acción.'
			})
		}
	}

	modalAceptar = () => {

		if(this.props.courseReducer.fetched) {
			this.props.history.push('/courseList')
		}
		this.closeModal?.current?.click()
		this.props.dispatch(courseAction.reintentar())
		this.setState({
			modalText: ''
		})
		
	}

	render(){
		
		const { t } = this.props;

		let caratula: string = 'defaultimage.png'
		let logo: string = 'defaultimage.png'
		let modalText: string = ''
		let color: string = '#5600c2'
		let permissions: {
			number: string
		}[] = []
		let BASE: any = {}
		let courseCreateEnabled: boolean = false
	
		if(this.props.appReducer.color !== '') {
			color = this.props.appReducer.color
		}

		if(this.props.courseReducer.caratula !== '') caratula = this.props.courseReducer?.caratula || 'defaultimage.png'
		if(this.props.courseReducer.logo !== '') logo = this.props.courseReducer?.logo || 'defaultimage.png'

		if(this.props.courseReducer.fetched) {
			modalText = 'Curso: ' + this.state.name + ', creado exitosamente.'
		} else {
			if(this.state.modalText !== '') {
				modalText = this.state.modalText
			} else {
				modalText = this.props?.courseReducer?.message || ''
			}
		}

		if(this.props.permissionReducer) {
			permissions = this.props.permissionReducer.data
			BASE = this.props.permissionReducer.base
		}

		if(Array.isArray(permissions)) {
			permissions.map((permission: {
				number: string
			}) => {
				if(permission.number === BASE.createCourse) courseCreateEnabled = true
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
										<span style={{ color: color }} className="section-topname"><i className="fas fa-briefcase mr-1" ></i> Configurar nuevo curso</span>
										<div className="divider-line"></div>
											<h2 className="section-title">Configuración de nuevo Curso</h2>
											<p className="section-subtitle">Desde esta sección podrás configurar tus cursos. Ingresa los datos correspondientes a los cursos que desees crear:</p>
										</div>
									</div>
									<div className="col-12">
										<div className="welcome-text">
											<CoursesForm
												getValue={ this.get }
												getFile={ this.getFile }
												caratula={ caratula }
												logo={ logo }
												getColor={ this.getColor	}
											/>
											<div className="d-flex justify-content-center">
												<button onClick={ () => this.saveCourse(courseCreateEnabled) } style={{ background: color, border: color }}	className="btn btn-primary rounded-buttons my-4">Guardar curso</button>
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
					title={ 'Cursos' }
					modalAceptar={ this.modalAceptar }
					fetching={ this.props?.courseReducer?.fetching || false }
				/>
			</div>
		);
	}
}

const Export = withTranslation()(Course)

export default connect(mapStateToProps)(Export)