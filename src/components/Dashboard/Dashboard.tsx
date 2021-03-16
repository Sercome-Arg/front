import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'

import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import config from './../../config'

import * as loginAction from '../../store/actions/login'
import * as permissionAction from '../../store/actions/permission'

import './css/dashboard.css'

const Deco = require('./img/deco.png')
const wspIcon = {
	color: '#79d852'
  };

function mapStateToProps(store: {
	appReducer: any,
	permissionReducer: any,
	userReducer: any,
}) {
	return {
		userReducer: store.userReducer,
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

		let userId: string | null = localStorage.getItem(config.session_user)
		if (localStorage.getItem(config.session_user) === null || localStorage.getItem(config.session_user) === undefined) this.props.history.push('/')
		if (userId !== null) this.props.dispatch(permissionAction.getPermissionByUser(userId))

	}

	logout = () => {
		localStorage.clear()
		this.props.dispatch(loginAction.reintentar())
	}

	render(){

		const { t } = this.props;

		let permissions: {
			permission: string
		}[] = []
		let BASE: any = {}

		let viewAgendaEnabled: boolean = false
		let viewGenMedEnabled: boolean = false
		let viewHomeEnabled: boolean = false
		let viewPasteurEnabled: boolean = false
		let viewOneSanofiEnabled: boolean = false
		let viewSpecialtyCareEnabled: boolean = false

		if(this.props.permissionReducer.fetched) {
			permissions = this.props.permissionReducer.data
			BASE = this.props.permissionReducer.base
		}

		if(
			Array.isArray(permissions) &&
			BASE !== undefined
		) {
			permissions.map((permission: {
				permission: string
			}) => {
				if(BASE.viewAgenda !== undefined) { if(permission.permission === BASE.viewAgenda) viewAgendaEnabled = true }
				if(BASE.viewGenMed !== undefined) { if(permission.permission === BASE.viewGenMed) viewGenMedEnabled = true }
				if(BASE.viewHome !== undefined) { if(permission.permission === BASE.viewHome) viewHomeEnabled = true }
				if(BASE.viewPasteur !== undefined) { if(permission.permission === BASE.viewPasteur) viewPasteurEnabled = true }
				if(BASE.viewOneSanofi !== undefined) { if(permission.permission === BASE.viewOneSanofi) viewOneSanofiEnabled = true }
				if(BASE.viewSpecialtyCare !== undefined) { if(permission.permission === BASE.viewSpecialtyCare) viewSpecialtyCareEnabled = true }
			})
		}

		return(
			<div className="align-elements-responsive">
				<nav className="navbar navbar-expand-lg navbar-light border-0" id="sidebar">
					<div className="sidebar-header">
						<img className="sidebar-logo-navleft" src={ Deco } alt="" />
					</div>
					{/* ACA VA EL BOOTON QUE ME LLEVE AL WHITEHEADER */}
					<div className="collapse navbar-collapse" id="navbarNavleft">
						<ul className="list-unstyled components">
							{
								viewHomeEnabled ? <li className="nav-item">
									<NavLink activeClassName='is-active' className="links" to='/home'><p className="text-uppercase sidebar-title">Home</p></NavLink>	
								</li> : null
							}
							{
								viewAgendaEnabled ? <li className="nav-item">
									<NavLink activeClassName='is-active' className="links" to='/agenda'><p className="text-uppercase sidebar-title">Agenda del evento</p></NavLink>
								</li> : null
							}
							{
								viewOneSanofiEnabled ? <li className="nav-item">
									<NavLink activeClassName='is-active' className="links" to='/sanofionesanofi'><p className="text-uppercase sidebar-title">Plenaria One Sanofi</p></NavLink>
								</li> : null
							}
							{
								viewGenMedEnabled ? <li className="nav-item">
									<NavLink activeClassName='is-active' className="links" to='/sanofigenmed'><p className="text-uppercase sidebar-title">Gen Med</p></NavLink>
								</li> : null
							}
							{
								viewPasteurEnabled ? <li className="nav-item">
									<NavLink activeClassName='is-active' className="links" to='/sanofipasteur'><p className="text-uppercase sidebar-title">Sanofi Pasteur</p></NavLink>
								</li> : null
							}
							{
								viewSpecialtyCareEnabled ? <li className="nav-item">
									<NavLink activeClassName='is-active' className="links" to='/sanofispecialty'><p className="text-uppercase sidebar-title">Specialty Care</p></NavLink>
								</li> : null
							}							
							<li className="nav-item d-block d-sm-block d-md-block d-lg-none">
							<a href="https://api.whatsapp.com/send?phone=541123800546" className="text-uppercase sidebar-title color-white"> <p className="">Mesa de ayuda <WhatsAppIcon style={wspIcon} fontSize="small" className="ml-2" /></p></a>
							</li>
							<li className="nav-item d-block d-sm-block d-md-block d-lg-none">
								<Link to='/' onClick={ this.logout }>
									<p className="mb-0 logout"> LOG OUT  </p>
								</Link>
							</li>		
						</ul>
					</div>
				</nav>
				<div className="help-sidebar my-2 d-none d-sm-none d-md-none d-lg-block" id="sidebar">
				<p className="mb-0">MESA DE AYUDA</p>
					<a href="https://api.whatsapp.com/send?phone=541123800546" target="blank" className="d-flex align-items-center"> 
						<p className="mb-0 mr-2">+54 9 11 23800546</p> <WhatsAppIcon style={wspIcon} fontSize="small" />
					</a>
					<a href="mailto:helpdesk@kickoff2021conosur.com" target="blank"> 
						<p style={{ fontSize: '12px' }} className="mb-0">helpdesk@kickoff2021conosur.com</p>
					</a>
				</div>
			</div>
		);
	}
}

const Export = withTranslation()(Dashboard)

export default connect(mapStateToProps)(Export)