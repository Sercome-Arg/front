import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'
import Divider from '@material-ui/core/Divider';

import * as subscriptionAction from '../../store/actions/subscription'
import * as userAction from '../../store/actions/user'
import * as studentAction from '../../store/actions/student'
import * as courseAction from '../../store/actions/course'
import * as appAction from '../../store/actions/app'
import * as quizAction from '../../store/actions/quiz'
import * as permissionAction from '../../store/actions/permission'

import { NewQuizForm } from '../Quiz'
import { NewQuestionQuizForm } from '../Quiz'
import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Modal } from '../Modal'
import { Footer } from '../Footer'

import storage from '../../config'

import './css/exams.css'

const userPhoto = require('./img/user.jpg')

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {
	subscriptionReducer: any,
	quizReducer: any,
	courseReducer: any,
	permissionReducer: any,
}) {
	return {
		permissionReducer: store.permissionReducer,
		courseReducer: store.courseReducer,
		quizReducer: store.quizReducer,
		subscriptionReducer: store.subscriptionReducer,
	};
}

class Quiz extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
	name: string,
	description: string,
	course: string,
	questionList: string[],
	question: string,
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
			description: '',
			course: '',
			questionList: [],
			question: '',
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
		this.props.dispatch(studentAction.reintentar())
		this.props.dispatch(courseAction.getCourses())
		this.props.dispatch(appAction.reintentar())
		this.props.dispatch(quizAction.reintentar())

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

	saveQuiz = (enabled: boolean) => {

		this.openModal?.current?.click()

		if(enabled) {
			this.props.dispatch(quizAction.setQuiz(
				this.state.name,
				this.state.description,
				this.state.course,
				this.state.questionList
			))
		} else {
			this.setState({
				modalText: 'No está autorizado para realizar esta acción.'
			})
		}
	}

	modalAceptar = () => {

		if(this.props.quizReducer.fetched) {
			this.props.history.push('/quizList')
		}
		this.closeModal?.current?.click()
		this.props.dispatch(quizAction.reintentar())
		this.setState({
			question: '',
			modalText: '',
		})
		
	}

	addQuestion = (e: any) => {
		e.preventDefault()

		let { question } = this.state

		if(question !== '') {
			let currentQuestionList: string[] = [...this.state.questionList]

			currentQuestionList.push(question)

			this.setState({
				questionList: currentQuestionList,
				question: '',
			})
		}

	}

	render(){

		const { t } = this.props;

		let modalText: string = ''
		let courseList: any[] = []
		let permissions: {
			number: string
		}[] = []
		let BASE: any = {}
		let quizCreateEnabled: boolean = false

		if(this.props.quizReducer.fetched) {
			modalText = 'Encuesta creada exitosamente. Nombre: ' + this.state.name
		} else {
			if(this.state.modalText !== '') {
				modalText = this.state.modalText
			} else {
				modalText = this.props?.quizReducer?.message || ''
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
				if(permission.number === BASE.createQuiz) quizCreateEnabled = true
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
										<span className="section-topname"><i className="far fa-question-circle mr-1"></i> Encuestas</span>
							<div className="divider-line"></div>
							<h2 className="section-title">Configuración de encuestas</h2>
							
							<p className="section-subtitle">Desde esta sección podrás añadir encuestas para tus estudiantes. Ingresa los datos correspondientes a la encuesta que desees crear:</p>
						</div>
					</div>
						<div className="col-12">
						<div className="welcome-text">
							<NewQuizForm getValue={ this.get } courseList={ courseList } />
							<Divider className="my-5" />
							<NewQuestionQuizForm
								question={ this.state.question }
								getValue={ this.get }
								addQuestion={ this.addQuestion }
								questionList={ this.state.questionList }
							/>
							{/* <AccordionQuestion /> */}
						<div className="d-flex justify-content-center">
							<button onClick={ () => this.saveQuiz(quizCreateEnabled) } className="btn btn-primary rounded-buttons my-4">Guardar encuesta</button>
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
					title={ 'Encuestas' }
					modalAceptar={ this.modalAceptar }
					fetching={ this.props?.quizReducer?.fetching || false }
				/>
			</div>
		);
	}
}

const Export = withTranslation()(Quiz)

export default connect(mapStateToProps)(Export)