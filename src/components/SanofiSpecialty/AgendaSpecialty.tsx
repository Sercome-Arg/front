import React from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

const Deco1 = require('./img/deco1.png')
const SanofiBg = require('./img/sanofipasteur-bg.png')
const agenda = require('./agenda.pdf')

function mapStateToProps(store: {
}) {
	return {
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
										{/* <div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold mb-3">Sala Plenaria Gen Med</p>
										</div> */}
										
										<div className="d-flex align-items-center">
											<div className="d-flex align-items-center pr-4">												
													<p>15:00 a 17:00hs</p>																
											</div>
										<div>									
										<p className="font-weight-bold">Apertura</p></div>
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
										{/* <div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold">Sala </p><p className="lower-title"> Diabetes</p>
										</div>
										<div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold">Sala </p><p className="lower-title"> Praluent</p>
										</div>
										<div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold">Sala </p><p className="lower-title"> Especialidades</p>
										</div> */}
										<div className="d-flex align-items-center">
											<div className="d-flex align-items-center pr-4">												
													<p>9:00hs a 12:00 | <br/>
													14:00 a 17:00 hs
													</p>																
											</div>
										<div className="fullwidth">										
										<p className="">Gaucher & MPS</p>
										<p className="">Fabry & Pompe</p>
										<p className="">Esclerosis Múltiple</p>
										<p className="">Oncología</p>
										<p className="">Dupilumab: Plenaria</p>										
										<p className="">Dermatitis Atópica (Argentina)</p>										
										<p className="">Respirariorio (Argentina)</p>										
										<p className="">Dupilumab (Chile)</p>										
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
										{/* <div className="d-flex text-uppercase">
											<img className="mr-2 mt-1" width="25px" height="15px" src={Deco1} alt="" /><p className="font-weight-bold">Sala Plenaria Gen Med</p>
										</div>
										<p>1 hora</p> */}
										<div className="d-flex align-items-center">
											<div className="d-flex align-items-center pr-4">												
													<p>10:00 a 10:45hs</p>																
											</div>
										<div>									
										<p className="font-weight-bold">Cierre</p></div>
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
										<button className="btn btn-primary violet-buttons mt-3">Descargar agenda Specialty Care</button>
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