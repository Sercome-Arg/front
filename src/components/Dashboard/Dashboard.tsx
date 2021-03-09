import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import storage from './../../config'

import * as courseAction from '../../store/actions/course'
import * as permissionAction from '../../store/actions/permission'

import './css/dashboard.css'

const whiteLogo = require('./img/white-logo.png')

function mapStateToProps(store: {
	appReducer: any,
	permissionReducer: any,
}) {
	return {
		permissionReducer: store.permissionReducer,
		appReducer: store.appReducer,
	};
}

class Dashboard extends React.Component<{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	componentWillMount = () => {
		let userId: string | null = localStorage.getItem(storage.session_user)
		if(userId !== null) this.props.dispatch(permissionAction.getPermissionByUser(userId))
	}

	toCourses = (isTeacher: boolean) => {
		this.props.dispatch(courseAction.reintentar())
		if(isTeacher){
			this.props.dispatch(courseAction.getCourses())
		} else {
			this.props.dispatch(courseAction.getCoursesForStudent())
		}
	}

	render(){

		const { t } = this.props;

		let logo: any = whiteLogo
		let color: string = '#5600c2'
		let permissions: {
			number: string
		}[] = []
		let BASE: any = {}

		let courseListViewEnabled: boolean = false
		let courseCreateViewEnabled: boolean = false

		let fileListViewEnabled: boolean = false
		let fileCreateViewEnabled: boolean = false

		let linkListViewEnabled: boolean = false
		let linkCreateViewEnabled: boolean = false

		let testListViewEnabled: boolean = false
		let testCreateViewEnabled: boolean = false

		let userListViewEnabled: boolean = false
		let userCreateViewEnabled: boolean = false

		let paymentListViewEnabled: boolean = false
		let paymentCreateViewEnabled: boolean = false
		
		let quizListViewEnabled: boolean = false
		let quizCreateViewEnabled: boolean = false

		if(this.props.appReducer.color !== undefined &&this.props.appReducer.color !== '') {
			color = this.props.appReducer.color
		}

		if(this.props.color !== undefined && this.props.color !== '') {
			color = this.props.color
		}

		if(this.props.permissionReducer) {
			permissions = this.props.permissionReducer.data
			BASE = this.props.permissionReducer.base
		}

		if(Array.isArray(permissions)) {
			permissions.map((permission: {
				number: string
			}) => {
				if(permission.number === BASE.viewListCourse) courseListViewEnabled = true
				if(permission.number === BASE.viewCreateCourse) courseCreateViewEnabled = true

				if(permission.number === BASE.viewListFile) fileListViewEnabled = true
				if(permission.number === BASE.viewCreateFile) fileCreateViewEnabled = true

				if(permission.number === BASE.viewListLink) linkListViewEnabled = true
				if(permission.number === BASE.viewCreateLink) linkCreateViewEnabled = true

				if(permission.number === BASE.viewListTest) testListViewEnabled = true
				if(permission.number === BASE.viewCreateTest) testCreateViewEnabled = true

				if(permission.number === BASE.viewListUser) userListViewEnabled = true
				if(permission.number === BASE.viewCreateUser) userCreateViewEnabled = true

				if(permission.number === BASE.viewListPayment) paymentListViewEnabled = true
				if(permission.number === BASE.viewCreatePayment) paymentCreateViewEnabled = true
				
				if(permission.number === BASE.viewListQuiz) quizListViewEnabled = true
				if(permission.number === BASE.viewCreateQuiz) quizCreateViewEnabled = true
			})
		}

		if(this.props.logo !== undefined) logo = this.props.logo

		return(
			<nav id="sidebar" style={{ background: color }} className={ this.props.classSidebar }>
			<div className="sidebar-header" style={{ background: color }}>
				<img className="sidebar-logo" src={ logo } alt="" />
			</div>

			<ul className="list-unstyled components">
				<p className="text-uppercase font-weight-bold"> <i className="fas fa-home mr-1"></i> <a href="/Home">Inicio</a></p>
				<p className="text-uppercase sidebar-title">Administración de cursos</p>
				{
					( courseListViewEnabled || courseCreateViewEnabled ) ? <li>
						<a href="#cursosSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"> <i className="fas fa-briefcase mr-2"></i> Cursos</a>
						<ul className="collapse list-unstyled" id="cursosSubmenu">
							{
								courseListViewEnabled ? <li><Link onClick={ () => this.toCourses(fileListViewEnabled) } to='/courseList'>Mis cursos</Link></li> : null
							}
							{
								courseCreateViewEnabled ? <li><Link to="/course">Crear nuevo curso</Link></li> : null
							}
						</ul>
					</li> : null
				}
				{
					(fileListViewEnabled || fileCreateViewEnabled) ? <li>
						<a href="#fileSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fas fa-folder mr-2"></i> Materiales</a>
						<ul className="collapse list-unstyled" id="fileSubmenu">
							{
								fileCreateViewEnabled ? <li>
									<Link to="/file">Crear nuevo material</Link>
								</li> : null
							}
							{
								fileListViewEnabled ? <li>
									<Link to='/fileList'>Mis materiales</Link>
								</li> : null
							}
						</ul>
					</li> : null
				}
				{
					(linkListViewEnabled || linkCreateViewEnabled) ? <li>
						<a href="#linkSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fas fa-link mr-2"></i> URLs</a>
						<ul className="collapse list-unstyled" id="linkSubmenu">
							{
								linkCreateViewEnabled ? <li>
									<Link to="/link">Crear nueva URL</Link>
								</li> : null
							}
							{
								linkListViewEnabled ? <li>
									<Link to='/linkList'>Mis URLs</Link>
								</li> : null
							}
						</ul>
					</li> : null
				}
				{
					(testListViewEnabled || testCreateViewEnabled) ? <li>
						<a href="#examenSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"> <i className="fas fa-file-alt mr-2"></i> Exámenes</a>
						<ul className="collapse list-unstyled" id="examenSubmenu">
							{
								testCreateViewEnabled ? <li>
									<Link to='/newexam'>Crear examen</Link>
								</li> : null
							}
							{
								testListViewEnabled ? <li>
									<Link to='/examlist'>Exámenes creados</Link>
								</li> : null
							}
						</ul>
					</li> : null
				}
				{
					quizListViewEnabled ? <li>
						<a href="#quizSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"> <i className="far fa-question-circle mr-2"></i> Encuestas</a>
						<ul className="collapse list-unstyled" id="quizSubmenu">
							{
								quizCreateViewEnabled ? <li>
									<Link to='/newquiz'>Crear encuesta</Link>
								</li> : null
							}
							{
								quizListViewEnabled ? <li>
									<Link to='/quizlist'>Encuestas creadas</Link>
								</li> : null
							}
						</ul>
					</li> : null
				}
				
				{
					(userListViewEnabled || userCreateViewEnabled) ? <li>
						<a href="#studentSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"> <i className="fas fa-users mr-2"></i> Usuarios</a>
						<ul className="collapse list-unstyled" id="studentSubmenu">
							{
								userCreateViewEnabled ? <li>
									<Link to="/student"><i ></i>Crear usuarios</Link>
								</li> : null
							}
							{
								userListViewEnabled ? <li>
									<Link to="/studentList"><i ></i>Mis estudiantes</Link>
								</li> : null
							}
						</ul>
					</li> : null
				}
			
				<p className="text-uppercase sidebar-title mt-4">Cuenta</p>
				<li>
					<a href="#"><i className="fas fa-user-cog"></i> Mi perfil</a>	 
					{
						( paymentListViewEnabled || paymentCreateViewEnabled ) ? <>
							<a href="#pagosSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"> <i className="fas fa-credit-card"></i> Pagos</a>
							<ul className="collapse list-unstyled" id="pagosSubmenu">
								{
									paymentCreateViewEnabled ? <li>
										<Link to='/subscription'>Pagar cuenta</Link>
									</li> : null
								}
								{
									paymentListViewEnabled ? <li>
										<Link to='/paymentList'>Mis pagos</Link>
									</li> : null
								}
							</ul>
						</> : null
					}
					<a href="#"><i className="fas fa-envelope"></i> Mensajes</a>
					<a href="#"><i className="fas fa-info-circle"></i> Ayuda</a>
				</li>
			</ul>
		</nav>
		);
	}
}

const Export = withTranslation()(Dashboard)

export default connect(mapStateToProps)(Export)