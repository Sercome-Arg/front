import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import config from '../../config'

import './css/pasteur.css'

import { Dashboard } from '../Dashboard'
import { Footer } from '../Footer'
import { WhiteNavbar } from '../Navbar'
import { AgendaPasteur } from '../SanofiPasteur'

import * as permissionAction from '../../store/actions/permission'
import * as linkAction from '../../store/actions/link'

const Deco1 = require('./img/deco1.png')
const SanofiBg = require('./img/sanofipasteur-bg.png')

const divBorder = { borderRight: '1px solid white', };

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {
	permissionReducer: any,
	linkReducer: any,
}) {
	return {
		linkReducer: store.linkReducer,
		permissionReducer: store.permissionReducer,
	};
}

class Home extends React.Component<{}, {}> {
	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	componentWillMount() {

		let userId: string | null = localStorage.getItem(config.session_user)
		if (localStorage.getItem(config.session_user) === null || localStorage.getItem(config.session_user) === undefined) this.props.history.push('/')
		if (userId !== null) this.props.dispatch(permissionAction.getPermissionByUser(userId))
		this.props.dispatch(linkAction.getLinks())

	}

	render() {

		const { t } = this.props;

		let links: {
			url: string,
			room: string
		}[] = []

		let link_SANOFI_PASTEUR: string = ''

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

		if(this.props.linkReducer.fetched) {
			links = this.props.linkReducer.data
		}

		links.map((link: {
			url: string,
			room: string
		}) => {
			if(link.room === config.SANOFI_PASTEUR) link_SANOFI_PASTEUR = link.url
		})

		return (
			<div>
				<ScrollToTopOnMount />
				<div className="bg-container">
					<WhiteNavbar />
					<div className="wrapper">
						<Dashboard />
						<div className="container-fluid">
							<div className="row justify-content-center align-items-center">
								<div className="col-12 d-flex justify-content-center align-items-center">
								<div className="bg-section-container">
								<div><img className="img-fluid" src={ SanofiBg } alt="" /></div></div>
								</div>
							</div>

							{/* botones acceder */}
							<div className="container margin-top">

								<div className="row justify-content-center">
								<div className="col-12 col-md-4 text-center violet-bg">
									<div className="salas-button">
											<p className="button-title">
												Plenaria Sanofi Pasteur
											</p>
											<p className="button-access">
												{
													viewPasteurEnabled ? <a href={ link_SANOFI_PASTEUR } target="blank">Acceder </a> : 'Acceder'
												}
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
										
									</div>

								</div>
								{/* <div className="row violet-bg my-4">
									<div className="col-12 col-md-4 text-center">
										<div className="salas-button" style={divBorder}>
											<p className="button-title">
												Kick Off Gen Med
											</p>
											<p className="button-access">
												{
													viewGenMedEnabled ? <Link to="/sanofigenmed"> Acceder </Link> : 'Acceder'
												}
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
									</div>
									<div className="col-12 col-md-4 text-center">
									<div className="salas-button" style={divBorder}>
											<p className="button-title">
												Kick Off One Sanofi
											</p>
											<p className="button-access">
												{
													viewOneSanofiEnabled ? <Link to="/sanofionesanofi"> Acceder </Link> : 'Acceder'
												}
												
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
									
									</div>
									<div className="col-12 col-md-4 text-center">
									<div className="salas-button">
											<p className="button-title">
												Kick Off Specialty Care
											</p>
											<p className="button-access">
												{
													viewSpecialtyCareEnabled ? <Link to="/sanofispecialty">Acceder </Link> : 'Acceder'
												}
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
										
									</div>

								</div> */}
							</div>
							{/* fin botones acceder */}
						</div>
						{/* end container fluid */}
					</div>
						{/* end wrapper */}



					<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								<div className="agenda-home">
									<h4 className="white-titles">Agenda</h4>
								</div>
							</div>
						</div>					

						<AgendaPasteur/>

					</div>
				</div>
				{/* end bg container */}
				<Footer />
			</div>
		);
	}
}

const Export = withTranslation()(Home)

export default connect(mapStateToProps)(Export)