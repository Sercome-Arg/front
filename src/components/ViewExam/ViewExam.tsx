import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import * as examAction from './../../store/actions/exam'

import { Footer } from '../Footer'
import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Permission } from '../Permission'
import { ViewExamStepper } from '../ViewExam'

import PERMISSIONS from '../config'

import './css/home.css'

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
	userReducer: any,
	permissionReducer: any,
	appReducer: any,
	examReducer: any,
}) {
	return {
		examReducer: store.examReducer,
		appReducer: store.appReducer,
		permissionReducer: store.permissionReducer,
		userReducer: store.userReducer,
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer,
		subscriptionReducer: store.subscriptionReducer,
	};
}

class Home extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
	allowed: boolean
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
			allowed: true
		};
	}

	componentWillMount = () => {
		this.props.dispatch(examAction.getExam(this.props.match.params.id))
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

		let color: string = '#5600c2'
		let exam: any = {}
		let questionList: any[] = []

		if(this.props.appReducer?.color !== '') {
			color = this.props.appReducer.color
		}

		if(this.props?.examReducer?.fetched) {
			exam = this.props?.examReducer?.data?.exam || {}
			questionList = this.props?.examReducer?.data?.questionList || []
		}

		return(
			<div>
				<Permission permission={ PERMISSIONS.viewHome } { ...this.props }/>
				<ScrollToTopOnMount />
				<div className="wrapper">
					<Dashboard classSidebar={ this.state.classSidebar } />

				{/* <!-- Page Content Holder --> */}
			<div id="content">
			<div className="container-fluid">
				<Navbar classButton={ this.state.classButton } userPhoto={ userPhoto } collapse={ this.collapse } />
				<div className="row">
					<div className="col-12">
						<div className="welcome-text">
							<span style={{ color: color }} className="section-topname"><i className="fas fa-file-alt mr-1"></i> Exámenes</span>
							<div className="divider-line"></div>
							<h2 className="section-title">¡Hola { this.props.userReducer.data.user || '' }! Es hora de poner a prueba tus conocimientos.</h2>
							<p className="section-subtitle">Otros textos.</p>
						</div>
					</div>
					<div className="col-12">
						<div className="welcome-text">
							
						<ViewExamStepper 
							exam={ exam }
							questionList={ questionList }
						/>
						</div>
					</div>
						
				
						<Footer/>
						
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