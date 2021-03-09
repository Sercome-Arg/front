import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'

import * as subscriptionAction from '../../store/actions/subscription'
import * as studentAction from '../../store/actions/student'
import * as appAction from '../../store/actions/app'

import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Modal } from '../Modal'

import storage from '../../config'

import './css/salaconfig.css'
import { StudentSearch, StudentTable } from '.';

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
	studentReducer: any,
}) {
	return {
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
		courseReducer: store.courseReducer,
		studentReducer: store.studentReducer,
	};
}

class StudentList extends React.Component<{}, {
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
		this.props.dispatch(studentAction.getStudents())
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

	delete = (id: string) => {
		this.openModal?.current?.click()
		this.props.dispatch(studentAction.deleteStudent(id))
	}

	modalAceptar = () => {

		this.closeModal?.current?.click()
		this.props.dispatch(studentAction.reintentar())
		this.props.dispatch(studentAction.getStudents())

	}

	render(){

		const { t } = this.props;

		let studentList: any[] = []
		let modalText: string = ''

		if(this.props.studentReducer.fetched) {
			studentList = this.props.studentReducer.data
		}

		if(this.props.studentReducer.fetched) {
			modalText = 'Estudiante eliminado exitosamente'
		} else {
			modalText = this.props?.studentReducer?.message || ''
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
							<span className="section-topname"><i className="fas fa-users mr-1"></i> Estudiantes</span>
							<div className="divider-line"></div>
							<h2 className="section-title">Lista de estudiantes</h2>
							<p className="section-subtitle">Desde esta sección podrás buscar, ver y editar los estudiantes creados hasta el momento.</p>
						</div>
					</div>
						<div className="col-12">
						<div className="welcome-text">
							<StudentSearch />
							<div className="my-4">
								<StudentTable
									studentList={ studentList }
									delete={ this.delete }
								/>
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
					fetching={ this.props?.studentReducer?.fetching || false }
				/>
			</div>
		);
	}
}

const Export = withTranslation()(StudentList)

export default connect(mapStateToProps)(Export)