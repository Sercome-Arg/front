import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'
import { Link } from "react-router-dom";

import * as subscriptionAction from '../../store/actions/subscription'
import * as userAction from '../../store/actions/user'
import * as courseAction from '../../store/actions/course'
import * as linkAction from '../../store/actions/link'
import * as fileAction from '../../store/actions/file'

import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Modal } from '../Modal'
import { Footer } from '../Footer'
import { CourseCard } from '../Course'

import storage from '../../config'

import './css/salaconfig.css'
import { string } from 'prop-types';
import { link } from 'fs';

const userPhoto = require('./img/user.jpg')

function ScrollToTopOnMount() {
	useEffect(() => { window.scrollTo(0, 0); }, []);
	return null;
}

function mapStateToProps(store: {
	courseReducer: any,
	appReducer: any,
	subscriptionReducer: any,
	linkReducer: any,
	fileReducer: any,
}) {
	return {
		subscriptionReducer: store.subscriptionReducer,
		appReducer: store.appReducer,
		courseReducer: store.courseReducer,
		linkReducer: store.linkReducer,
		fileReducer: store.fileReducer
	};
}

class asd extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
	modalText: any,
	title: string,
	link: string	
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
			modalText: <div></div>,
			title: '',
			link: '',
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
		this.props.dispatch(courseAction.getCourse(this.props.match.params.id))

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

	modalAceptar = () => {

		this.closeModal?.current?.click()
		this.setState({
			title: '',
			modalText: <div></div>
		})
		this.props.dispatch(linkAction.reintentar())
	}
 
	modalbutton = (cardNumber: number) => {

		this.openModal?.current?.click()
		if(cardNumber === 1){
			this.setState({
				title: 'Sala virtual\n',
				modalText: <div><p>Aqui se encuentra la sala virtual</p><p>Todavia no ha sido creada</p></div>

			})
		}
		if(cardNumber === 2){
			this.props.dispatch(linkAction.getLinksForCourse(this.props.match.params.id))
			this.setState({
				title: 'Videos',
				modalText: ''
			})
		}
		if(cardNumber === 3){
			this.props.dispatch(fileAction.getFileForCourse(this.props.match.params.id))
			this.setState({
				title: 'Material',
				modalText: <div><p>Aqui se encuentra el material del curso</p><p>Todavia no ha sido subido</p></div>

			})
		}
		if(cardNumber === 4){
			this.setState({
				title: 'Examen',
				modalText: <div><p>Aqui se encuentran los exámenes</p><p>Todavia no han sido creados</p></div>

			})
		}
		if(cardNumber === 5){
			this.setState({
				title: 'Foro',
				modalText: <div><p>Aqui se encuentran los foros</p><p>Todavia no han sido creados</p></div>

			})
		}
		if(cardNumber === 6){
			this.setState({
				title: 'Encuesta',
				modalText: <div><p>Aqui se encuentran las encuestas</p><p>Todavia no han sido creadas</p></div>

			})
		}

	}
	
	render(){

		const { t } = this.props;

		let links: any[] = []
		let files: any[] = []
		let color: string = '#5600c2'
		let name: string = ''
		let description: string = ''
		let fetching: boolean = false
	
		if(this.props.courseReducer.fetched) {
			color = this.props.courseReducer?.data?.color || '#5600c2'
			name = this.props.courseReducer?.data?.name || 'Nombre del Curso'
			description = this.props.courseReducer?.data?.description || 'Descripción del Curso'
		}

		if(this.props.linkReducer.fetched) {
			links = this.props.linkReducer.data
		}
		
		if(this.props.fileReducer.fetched) {
			files = this.props.fileReducer.data
		}

		if(this.props.linkReducer.fetching) fetching = true
		if(this.props.fileReducer.fetching) fetching = true

		if(this.props.fileReducer.fetched)

		return(
			<div>
				asd
				
			</div>
		);
	}
}

const Export = withTranslation()(asd)

export default connect(mapStateToProps)(Export)