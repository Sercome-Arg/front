import React from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import './css/pasteur.css'

const Deco1 = require('./img/deco1.png')
const agenda = require('./agenda.pdf')

function mapStateToProps(store: {}) {
	return {};
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

	render() {
		return (
			<div>						
						<div className="row">
							<div className="col-12 col-md-4 text-center">
								<div className="violet-cards">
									<div className="agenda-title d-flex">
										<i className="far fa-calendar-alt mr-2 pt-1"></i>
											<div>
											<h6 className="">Miercoles <b>24</b></h6>
											<h6 className="month"> Febrero</h6>
											</div>
									</div>
									<div className="agenda-turno">
										<div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold text-uppercase mb-3">Por la tarde</p>
										</div>
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>14:00hs</p>																
											</div>
										<div>									
										<p className="">Apertura</p>
										<p className="">Resultados del negocio</p>
										<p className="">Update Planta Pilar</p>
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>15:00hs</p>																
											</div>
										<div>									
										<p className="">Covid estrategias PU de vacunación SC</p>
										<p className="">Covid: Inteligencia Competitiva (contexto)</p>
										<p className="">Vacunas Covid Sanofi</p>
										<p className="">Q&A</p>
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>16:30hs</p>																
											</div>
										<div>									
										<p className="">Cierre del día</p>
										
										
										</div>
										</div>
									</div>

									<div className="center-elements">
										<div className="divider"></div>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-4 text-center">
								<div className="violet-cards">
									<div className="agenda-title d-flex">
										<i className="far fa-calendar-alt mr-2 pt-1"></i>
										<div>
											<h6 className="">Jueves <b>25</b></h6>
											<h6 className="month"> Febrero</h6></div>
										</div>
										<div className="agenda-turno">
										<div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold text-uppercase mb-3">Todo el día</p>
										</div>
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>10:00hs</p>																
											</div>
										<div>									
										<p className="">Apertura</p>
										<p className="">Digital + Q&A</p>										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>11:05hs</p>																
											</div>
										<div>									
										<p className="font-weight-bold">Status ongoing projects presentados en 2020</p>																							
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>11:30hs</p>																
											</div>
										<div>									
										<p className="font-weight-bold">Best practices por sector | por negocio | por franquicia</p>																						
										</div>
										</div>
										<div className="mt-4 text-center">											
										<div>									
										<p className="font-weight-bold almuerzo">Almuerzo</p>																						
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>14:00hs</p>																
											</div>
										<div>									
										<p className="font-weight-bold">Comportamientos Play to win</p>									
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>15:00hs</p>																
											</div>
										<div>									
										<p className="">Workshop / Actividad teambuilding</p>									
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>16:30hs</p>																
											</div>
										<div>									
										<p className="font-weight-bold">Cierre del día</p>									
										
										</div>
										</div>
									</div>
									<div className="center-elements">
										<div className="divider"></div>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-4 text-center">
								<div className="violet-cards">
									<div className="agenda-title d-flex">
										<i className="far fa-calendar-alt mr-2 pt-1"></i>
										<div>
											<h6 className="">Viernes <b>26</b></h6>
											<h6 className="month"> Febrero</h6>
										</div>
									</div>
									<div className="agenda-turno">
										<div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold text-uppercase mb-3">Por la mañana</p>
										</div>
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>9:00hs</p>																
											</div>
										<div>									
										<p className="">Prioridades</p>									
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>10:00hs</p>																
											</div>
										<div>						
										
										<p className="">Q&A</p>
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>10:30hs</p>																
											</div>
										<div>						
										
										<p className="">Cierre Pasteur</p>
										
										</div>
										</div>
										
									</div>
								
									<div className="center-elements">
										<div className="divider"></div>
									</div>
								</div>
							</div>
						</div>
                        <div className="row">
							<div className="col-12">
								<div className="text-center">
								<a href={ agenda } target="_blank">
									<button className="btn btn-primary violet-buttons mt-3">Descargar agenda Sanofi Pasteur</button>
								</a>
								</div>
							</div>
						</div>
					</div>			
			
		
		);
	}
}

const Export = withTranslation()(Home)

export default connect(mapStateToProps)(Export)