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
import * as examAction from '../../store/actions/exam'
import * as permissionAction from '../../store/actions/permission'

import { AccordionQuestion } from '../Exams'
import { NewExamForm } from '../Exams'
import { NewQuestionsForm } from '../Exams'
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
	loginReducer: any,
	registerReducer: any,
	languageReducer: any,
	subscriptionReducer: any,
	courseReducer: any,
	examReducer: any,
	questionTypeReducer: any,
	permissionReducer: any,
}) {
	return {
		permissionReducer: store.permissionReducer,
		questionTypeReducer: store.questionTypeReducer,
		examReducer: store.examReducer,
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
		courseReducer: store.courseReducer,
	};
}

class Exam extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
	name: string,
	duration: string
	description: string,
	course: string,
	questionList: {
		question: string,
		questionType: string
	}[],
	answerList: {
		answer: string,
		calification: string
	}[],
	modalText: string,
	question: string,
	calification: string,
	answer: string,
	questionType: string,
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
			duration: '',
			description: '',
			course: '',
			questionList: [],
			modalText: '',
			calification: '', 
			question: '',
			answer: '',
			questionType: '',
			answerList: []
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
		this.props.dispatch(examAction.reintentar())

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

	saveExam = (enabled: boolean) => {

		this.openModal?.current?.click()

		if(enabled) {
			let isValid: boolean = true

			if(isValid && this.state.course === '') {
				isValid = false
				this.setState({
					modalText: 'Falta elegir el curso correspondiente'
				})
			}

			if(isValid && this.state.name === '') {
				isValid = false
				this.setState({
					modalText: 'Falta elegir el nombre del exámen'
				})
			}

			if(isValid && this.state.questionList.length === 0) {
				isValid = false
				this.setState({
					modalText: 'El exámen que desea guardar no posee ninguna pregunta'
				})
			}

			if(isValid) {
				this.props.dispatch(examAction.setExam(
					this.state.name,
					this.state.duration,
					this.state.description,
					this.state.course,
					this.state.questionList
				))
			}
		} else {
			this.setState({
				modalText: 'No está autorizado para realizar esta acción.'
			})
		}
	}

	modalAceptar = () => {

		if(this.props.examReducer.fetched) {
			this.props.history.push('/examList')
		}
		this.closeModal?.current?.click()
		this.props.dispatch(examAction.reintentar())
		this.setState({
			modalText: ''
		})

	}
	
	addQuestion = (e: any) => {
		e.preventDefault()

		let { question, questionType } = this.state

		let currentQuestionList: any[] = [...this.state.questionList]

		currentQuestionList.push({
			question,
			questionType,
			answerList: [ ...this.state.answerList ]
		})

		this.setState({ 
			question: '',
			questionType: '',
			questionList: currentQuestionList,
			answerList: [],
			answer: '',
			calification: '',
		})

	}

	addAnswer = (e: any) => {
		e.preventDefault()

		let { answer, calification } = this.state

		let currentAnswerList: any[] = [...this.state.answerList]

		currentAnswerList.push({
			answer,
			calification
		})

		this.setState({ 
			answer: '',
			calification: '',
			answerList: currentAnswerList
		})

	}

	render(){

		const { t } = this.props;

		let modalText: string = ''
		let courseList: any[] = []
		let questionTypeList: any[] = []
		let permissions: {
			number: string
		}[] = []
		let BASE: any = {}

		let testCreateEnabled: boolean = false

		if(this.props.examReducer.fetched) {
			modalText = 'Exámen creado exitosamente. Nombre: ' + this.state.name
		} else {
			if(this.state.modalText !== '') {
				modalText = this.state.modalText
			} else {
				modalText = this.props?.examReducer?.message || ''
			}
		}

		if (this.props.courseReducer.fetched){
			courseList = this.props.courseReducer.data
		}

		if (this.props.questionTypeReducer.fetched){
			questionTypeList = this.props.questionTypeReducer.data
		}

		if(this.props.permissionReducer) {
			permissions = this.props.permissionReducer.data
			BASE = this.props.permissionReducer.base
		}

		if(Array.isArray(permissions)) {
			permissions.map((permission: {
				number: string
			}) => {
				if(permission.number === BASE.createTest) testCreateEnabled = true
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
										<span className="section-topname"><i className="fas fa-file-alt mr-1"></i> Exámenes</span>
							<div className="divider-line"></div>
							<h2 className="section-title">Configuración de nuevo examen</h2>
							
							<p className="section-subtitle">Desde esta sección podrás añadir exámenes para tus estudiantes. Ingresa los datos correspondientes al examen que desees crear:</p>
						</div>
					</div>
						<div className="col-12">
						<div className="welcome-text">

							<NewExamForm
								courseList={ courseList }
								getValue={ this.get }
							/>
									
					


						<Divider className="my-5" />

							<NewQuestionsForm
								addQuestion={ this.addQuestion }
								addAnswer={ this.addAnswer }
								getValue={ this.get }
								question={ this.state.question }
								questionType={ this.state.questionType }
								answerList={ this.state.answerList }
								answer={ this.state.answer }
								calification={ this.state.calification }
							/>

							<AccordionQuestion
								questionList={ this.state.questionList }
								answerList={ this.state.answerList }
							/>

						<div className="d-flex justify-content-center">
							<button onClick={ () => this.saveExam(testCreateEnabled) } className="btn btn-primary rounded-buttons my-4">Guardar examen</button>
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
					title={ 'Exámenes' }
					modalAceptar={ this.modalAceptar }
					fetching={ this.props?.examReducer?.fetching || false }
				/>
			</div>
		);
	}
}

const Export = withTranslation()(Exam)

export default connect(mapStateToProps)(Export)