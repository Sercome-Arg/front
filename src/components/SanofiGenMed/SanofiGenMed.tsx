import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import config from '../../config'

import './css/GenMed.css'

import { Dashboard } from '../Dashboard'
import { Footer } from '../Footer'
import { WhiteNavbar } from '../Navbar'
import { AgendaGenMed } from '../SanofiGenMed'

import * as linkAction from '../../store/actions/link'

const Deco1 = require('./img/deco1.png')
const SanofiBg = require('./img/genmed-bg.png')

const divBorder = { borderRight: '1px solid white' };

function ScrollToTopOnMount() {
	useEffect(() => { window.scrollTo(0, 0); }, []);
	return null;
}

function mapStateToProps(store: {
	linkReducer: any,
}) {
	return {
		linkReducer: store.linkReducer,
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
		this.props.dispatch(linkAction.getLinks())
	}

	render() {

		const { t } = this.props;

		let links: {
			url: string,
			room: string
		}[] = []

		let link_GENMED: string = ''
		let link_SALA_ESPECIALIDADES: string = ''
		let link_SALA_PRALUENT: string = ''
		let link_SALA_DIABETES_CLEXANE: string = ''

		if(this.props.linkReducer.fetched) {
			links = this.props.linkReducer.data
		}

		links.map((link: {
			url: string,
			room: string
		}) => {
			if(link.room === config.GENMED) link_GENMED = link.url
			if(link.room === config.SALA_ESPECIALIDADES) link_SALA_ESPECIALIDADES = link.url
			if(link.room === config.SALA_PRALUENT) link_SALA_PRALUENT = link.url
			if(link.room === config.SALA_DIABETES_CLEXANE) link_SALA_DIABETES_CLEXANE = link.url
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
												Plenaria Gen Med
											</p>
											<p className="button-access">
												<a href={ link_GENMED } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
										
									</div>

								</div>
								<div className="row violet-bg my-4">
									<div className="col-12 col-md-4 text-center">
										<div className="salas-button" style={divBorder}>
											<p className="button-title">
												Sala Diabetes Clexane
											</p>
											<p className="button-access">
												<a href={ link_SALA_DIABETES_CLEXANE } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
									</div>
									<div className="col-12 col-md-4 text-center">
									<div className="salas-button" style={divBorder}>
											<p className="button-title">
												Sala Praluent
											</p>
											<p className="button-access">
												<a href={ link_SALA_PRALUENT } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
									
									</div>
									<div className="col-12 col-md-4 text-center">
									<div className="salas-button">
											<p className="button-title">
												Sala Especialidades
											</p>
											<p className="button-access">
												<a href={ link_SALA_ESPECIALIDADES } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
										
									</div>

								</div>
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

							<AgendaGenMed/>

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