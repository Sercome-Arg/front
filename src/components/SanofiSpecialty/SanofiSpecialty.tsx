import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import config from '../../config'

import './css/SanofiEspecialty.css'

import { Dashboard } from '../Dashboard'
import { Footer } from '../Footer'
import { WhiteNavbar } from '../Navbar'
import { AgendaSpecialty } from '../SanofiSpecialty'

import * as linkAction from '../../store/actions/link'

const Deco1 = require('./img/deco1.png')
const SanofiBg = require('./img/sanofipasteur-bg.png')

const divBorder = { borderRight: '1px solid white' };

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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

		let link_SPECIALTY_CARE: string = ''
		let link_GAUCHER: string = ''
		let link_FABRI: string = ''
		let link_ESCLEROSIS: string = ''
		let link_ONCO: string = ''
		let link_PLENARIA_DUPILUMAB: string = ''
		let link_DA_ARG: string = ''
		let link_ASMA_ARG: string = ''
		let link_DUPULUMAB_CHILE: string = ''

		if(this.props.linkReducer.fetched) {
			links = this.props.linkReducer.data
		}

		links.map((link: {
			url: string,
			room: string
		}) => {
			if(link.room === config.SPECIALTY_CARE) link_SPECIALTY_CARE = link.url
			if(link.room === config.GAUCHER) link_GAUCHER = link.url
			if(link.room === config.FABRI) link_FABRI = link.url
			if(link.room === config.ESCLEROSIS) link_ESCLEROSIS = link.url
			if(link.room === config.ONCO) link_ONCO = link.url
			if(link.room === config.PLENARIA_DUPILUMAB) link_PLENARIA_DUPILUMAB = link.url
			if(link.room === config.DA_ARG) link_DA_ARG = link.url
			if(link.room === config.ASMA_ARG) link_ASMA_ARG = link.url
			if(link.room === config.DUPULUMAB_CHILE) link_DUPULUMAB_CHILE = link.url
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
							<div className="container-fluid margin-top">

								<div className="row justify-content-center">
								<div className="col-12 col-md-4 text-center violet-bg">
									<div className="salas-button">
											<p className="button-title">
												Plenaria Specialty Care
											</p>
											<p className="button-access">
												<a href={ link_SPECIALTY_CARE } target="blank">
												Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
										
									</div>

								</div>
								<div className="row violet-bg my-4">
									<div className="col-12 col-md-4 text-center">
										<div className="salas-button" style={divBorder}>
											{/* <p className="button-title">
												Grupo 1
											</p> */}
											<p className="mb-0 white-text">Gaucher & MPS</p>
											<p className="button-access">
												<a href={ link_GAUCHER } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
									</div>
									<div className="col-12 col-md-4 text-center">
									<div className="salas-button" style={divBorder}>
											{/* <p className="button-title">
												Grupo 2
											</p> */}
											<p className="mb-0 white-text">Fabry & Pompe</p>
											<p className="button-access">
												<a href={ link_FABRI } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
									
									</div>
									<div className="col-12 col-md-4 text-center">
									<div className="salas-button">
											{/* <p className="button-title">
											Grupo 3
											</p> */}
											<p className="mb-0 white-text">Esclerosis Múltiple</p>
											<p className="button-access">
												<a href={ link_ESCLEROSIS } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
										
									</div>

								</div>

								
								<div className="row violet-bg my-4">
									<div className="col-12 col-md-3 text-center">
										<div className="salas-button" style={divBorder}>
											{/* <p className="button-title">
												Grupo 4
											</p> */}
											<p className="mb-0 white-text">Onco</p>
											<p className="button-access">
												<a href={ link_ONCO } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
									</div>
									<div className="col-12 col-md-3 text-center">
									<div className="salas-button d-flex justify-content-center">
											{/* <p className="button-title">
												Grupo 5
											</p> */}
											<div className="pr-3">
											<p className="mb-0 white-text">Plenaria Dupilumab</p>
											<p className="button-access">
												<a href={ link_PLENARIA_DUPILUMAB } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>	</div>
											<div className="d-flex align-items-center justify-content-center">
											<div>
											<img className="img-fluid deco-button" width="60px"  src={ Deco1 } alt="" />	</div>		</div>						
										</div>
									
									</div>
									<div className="col-12 col-md-2 text-center">
									<div className="salas-button" style={divBorder}>
											{/* <p className="button-title">
											Grupo 6
											</p> */}
											<p className="mb-0 white-text text-uppercase">DA Arg</p>
											<p className="button-access">
												<a href={ link_DA_ARG } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
										
									</div>
									<div className="col-12 col-md-2 text-center">
									<div className="salas-button" style={divBorder}>
											{/* <p className="button-title">
											Grupo 6
											</p> */}
											<p className="mb-0 white-text text-uppercase">Asma Arg</p>
											<p className="button-access">
												<a href={ link_ASMA_ARG } target="blank">Acceder </a>
											</p>
											<KeyboardArrowUpIcon style={{ color: 'white' }}/>
										</div>
										
									</div>
									<div className="col-12 col-md-2 text-center">
									<div className="salas-button">
											{/* <p className="button-title">
											Grupo 7
											</p> */}
											<p className="mb-0 white-text">Dupilumab CHILE</p>
											<p className="button-access">
												<a href={ link_DUPULUMAB_CHILE } target="blank">Acceder </a>
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
						
						<AgendaSpecialty/>
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