import React from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import './css/styles.css'

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
							<div className="col-12 col-md-6 col-lg-6 col-xl-4 text-center">
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
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold mb-3">Por la mañana</p>
										</div>
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>10:00hs</p>																
											</div>
										<div>
										<p className="font-weight-bold font-italic">Sanofi Global - Prioridades 2021</p>
										<p className="font-weight-bold font-italic">Hacia dónde vamos: South Cone</p>
										<p>Roadmap</p>
										</div>
										</div>

										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>10:25hs</p>																
											</div>
										<div className="fullwidth">
										<p className="font-weight-bold text-center">Prioridades 2021</p>
										<p className="">Recursos Humanos</p>
										<p className="">Finanzas</p>
										<p className="">Specialty Care</p>
										<p className="">General Medicines</p>
										<p className="">CHC</p>
										<p className="">Sanofi Pasteur</p>										
										</div>
										</div>
										<div className="fullwidth">
										<p className="font-weight-bold text-center mt-4">EBI & Control Interno</p></div>
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>11:25hs</p>																
											</div>
										<div>
										<p className="">Prioridades & Conductas. Logros SEC</p>
										<p className="">Innovación hacia el futuro</p></div>
										</div>
										<div className="d-flex mt-2">
											<div className="d-flex align-items-center pr-4">												
													<p>11:55hs</p>																
											</div>
										<div>
										<p className="">Preguntas y respuestas</p>
										</div>
									</div>
									</div>

									<div className="agenda-turno">
										<div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold mb-3">Por la tarde</p>
										</div>
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>14:00 a 17:00hs</p>																
											</div>
										<div>
										<p className="">Kick Off GBU'S</p>
										</div>
										</div>
									</div>
									<div className="center-elements">
										<div className="divider"></div>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-6 col-lg-6 col-xl-4 text-center">
								<div className="violet-cards">
									<div className="agenda-title d-flex">
										<i className="far fa-calendar-alt mr-2 pt-1"></i>
										<div>
											<h6 className="">Jueves <b>25</b></h6>
											<h6 className="month"> Febrero</h6></div>
										</div>
									<div className="agenda-turno">
										<div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold mb-3">Todo el día</p>
										</div>
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>09:00 a 17:00hs</p>																
											</div>
										<div>
										<p className="">Kick Off GBU's</p>
										</div>
										</div>
									</div>
									<div className="center-elements">
										<div className="divider"></div>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-6 col-lg-6 col-xl-4 text-center">
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
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold mb-3">Por la mañana</p>
										</div>
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>11:00</p>																
											</div>
										<div>
										<p className="">Transformación digital</p>
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>12:00</p>																
											</div>
										<div>
										<p className="">"#ModoSanofi"</p>
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>12:15</p>																
											</div>
										<div>
										<p className="">Diversidad e inclusión</p>
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>12:30</p>																
											</div>
										<div>
										<p className="">Cultura PTW</p>
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>12:45</p>																
											</div>
										<div>
										<p className="">Concurso South Cone</p>
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>12:55</p>																
											</div>
										<div>
										<p className="">Cierre</p>
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
									<button className="btn btn-primary violet-buttons mt-3">Descargar agenda One Sanofi Conosur</button>
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