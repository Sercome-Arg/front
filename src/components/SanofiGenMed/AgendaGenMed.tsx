import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";


import { connect } from 'react-redux'

const Deco1 = require('./img/deco1.png')
const agenda = require('./agenda.pdf')

function mapStateToProps(store: {
	languageReducer: any,
	mercadoPagoReducer: any,
	userReducer: any,
}) {
	return {
		languageReducer: store.languageReducer,
		mercadoPagoReducer: store.mercadoPagoReducer,
		userReducer: store.userReducer,
	};
}

class Home extends React.Component<{}, {
	classSidebar: string,
	classButton: string
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
		};
	}


	render() {	

		return (
			<div>				
					<div className="row justify-content-center">
							<div className="col-12 col-md-6 col-lg-4 text-center">
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
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold mb-3">Por la tarde</p>
										</div>
										
										<div className="d-flex">
											<div className="d-flex align-items-center pr-4">												
													<p>14:00</p>																
											</div>
										<div>									
										<p className="">Apertura</p>									
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>14:05</p>																
											</div>
										<div>									
										<p className="">Priorities</p>									
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>15:40</p>																
											</div>
										<div>									
										<p className="">Actividad de cierre</p>									
										
										</div>
										</div>
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>15:50</p>																
											</div>
										<div>									
										<p className="">Q&A</p>									
										
										</div>
										</div>
									</div>

									<div className="center-elements">
										<div className="divider"></div>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-6 col-lg-4 text-center">
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
													<p>09:00 a<br/> 09:10</p>																
											</div>
										<div>									
										<p className="">Plenaria GenMed</p>									
										
										</div>
										</div>

										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>09:10 a <br/>12:00hs</p>																
											</div>
										<div>									
										<p className="">Diabetes + Clexane</p>							
										<p className="">Praulent</p>							
										<p className="">Especialidades</p>							
										
										</div>
										</div>
										<div className="mt-4 text-center">											
										<div>									
										<p className="font-weight-bold almuerzo">Almuerzo</p>																						
										</div>
										</div>
										
										<div className="d-flex mt-4">
											<div className="d-flex align-items-center pr-4">												
													<p>14:00 a <br/>17:00hs</p>																
											</div>
										<div>									
										<p className="">Diabetes + Clexane</p>							
										<p className="">Praulent</p>							
										<p className="">Especialidades</p>							
										
										</div>
										</div>
									</div>
									<div className="center-elements">
										<div className="divider"></div>
									</div>
								</div>
							</div>
							{/* <div className="col-12 col-md-4 text-center">
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
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold">Sala Plenaria Gen Med</p>
										</div>
										<p>1 hora</p>
									</div>
								
									<div className="center-elements">
										<div className="divider"></div>
									</div>
								</div>
							</div> */}
						</div>
						<div className="row">
							<div className="col-12">
								<div className="text-center">
									<a href={ agenda } target="_blank">
										<button className="btn btn-primary violet-buttons mt-3">Descargar agenda Gen Med</button>
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