import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'
import { Link } from "react-router-dom";

import * as subscriptionAction from '../../store/actions/subscription'
import * as courseAction from '../../store/actions/course'
import * as appAction from '../../store/actions/app'
import * as userAction from '../../store/actions/user'

import { CoursesList, SearchCourses } from '../CoursesList'
import { CoursesTable } from '../CoursesList'
import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { CourseCard } from '../CoursesList'
import { Permission } from '../Permission'

import PERMISSIONS from './../config'
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
}) {
	return {
		appReducer: store.appReducer,
		courseReducer: store.courseReducer,
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
	};
}

class Courses extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
}> {

	props: any
	static propTypes: any
	static defaultProps: any

	private openModal: React.RefObject<Element>;

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.openModal = React.createRef();
		this.state = {
			classSidebar: '',
			classButton: 'navbar-btn',
			
		};
	}

	componentWillMount() {
		this.props.dispatch(appAction.reintentar())
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

	select = (id: string) => {
		this.props.history.push('/course/' + id)
	}

	render(){

		const { t } = this.props;

		let color: string = '#5600c2'
		let courseList: any[] = []
		let courseRow0: {
			_id: string,
			name: string,
			color: string,
			description: string,
			caratula: string
		}[] = []
		let courseRow1: {
			_id: string,
			name: string,
			color: string,
			description: string,
			caratula: string
		}[] = []
		let courseRow2: {
			_id: string,
			name: string,
			color: string,
			description: string,
			caratula: string
		}[] = []
		let courseRow3: {
			_id: string,
			name: string,
			color: string,
			description: string,
			caratula: string
		}[] = []
		let courseTable: {
			_id: string,
			name: string,
			color: string,
			description: string,
			caratula: string
		}[][] = []

		if(this.props.courseReducer.fetched) {
			courseList = this.props.courseReducer.data
		}

		if(this.props.appReducer.color !== '') {
			color = this.props.appReducer.color
		}

		if(courseList.length > 0) courseRow0.push(courseList[0])
		if(courseList.length > 1) courseRow0.push(courseList[1])
		if(courseList.length > 2) courseRow0.push(courseList[2])
		if(courseList.length > 3) courseRow0.push(courseList[3])
		if(courseList.length > 4) courseRow1.push(courseList[4])
		if(courseList.length > 5) courseRow1.push(courseList[5])
		if(courseList.length > 6) courseRow1.push(courseList[6])
		if(courseList.length > 7) courseRow1.push(courseList[7])
		if(courseList.length > 8) courseRow2.push(courseList[8])
		if(courseList.length > 9) courseRow2.push(courseList[9])
		if(courseList.length > 10) courseRow2.push(courseList[10])
		if(courseList.length > 11) courseRow2.push(courseList[11])
		if(courseList.length > 12) courseRow3.push(courseList[12])
		if(courseList.length > 13) courseRow3.push(courseList[13])
		if(courseList.length > 14) courseRow3.push(courseList[14])
		if(courseList.length > 15) courseRow3.push(courseList[15])

		courseTable.push(courseRow0)
		courseTable.push(courseRow1)
		courseTable.push(courseRow2)
		courseTable.push(courseRow3)

		return(
			<div>
				<Permission permission={ PERMISSIONS.viewHome } { ...this.props }/>
				<ScrollToTopOnMount />
				<div className="wrapper">
					<Dashboard classSidebar={ this.state.classSidebar } />
					<div id="content">
						<div className="container-fluid">
							<Navbar classButton={ this.state.classButton } userPhoto={ userPhoto } collapse={ this.collapse } />
								<div className="row">
									<div className="col-12">
										<div className="welcome-text">
											<span style={{ color: color }} className="section-topname"><i className="fas fa-briefcase mr-1"></i> Mis cursos</span>
											<div className="divider-line"></div>
											<h2 className="section-title">Lista de cursos</h2>
											<p className="section-subtitle">Desde esta sección podrás buscar, ver y editar los cursos creados hasta el momento.</p>
										</div>
									</div>
									<div className="col-12">
										<div className="welcome-text">
											<SearchCourses />
											{
												courseTable.map((courseRow: {
													_id: string,
													name: string,
													color: string,
													description: string,
													caratula: string
												}[]) => {
													return <div className="row my-3 px-3">
														{
															courseRow.map((course: {
																_id: string,
																name: string,
																color: string,
																description: string,
																caratula: string
															}) => {
																let letter: string = course.name.substring(0,1).toUpperCase()
																	
																return <div className="col-12 col-sm-6 col-md-4 col-xl-3">
																	<div className="card my-4">
																	
																			<Link to={ '/course/' + course._id }>
																				<CourseCard 
																					letter={ letter } 
																					logo={ course.caratula } 
																					description={ course.description } 
																					color={ course.color } 
																					name={ course.name } 
																				/>
																			</Link>
																
																	</div>
																</div>
															})
														}
													</div>
												})
											}
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

const Export = withTranslation()(Courses)

export default connect(mapStateToProps)(Export)