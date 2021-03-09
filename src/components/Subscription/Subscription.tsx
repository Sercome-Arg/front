import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import './css/subscription.css'
import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'

import * as subscriptionAction from '../../store/actions/subscription'
import * as userAction from '../../store/actions/user'

import { connect } from 'react-redux'
import config from './../../config'

const wcLogo = require('./img/logo-oscuro.png')
const chipImg = require('./img/chip.png')
const bankImg = require('./img/bank.png')
const userPhoto = require('./img/user.jpg')

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

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

class Subscription extends React.Component<{}, {
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

  componentWillMount() {

    this.props.dispatch(subscriptionAction.reintentar())

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
  
  setValues = (amount: string, description: string) => {
    this.props.dispatch(subscriptionAction.setValues(amount, description))
  }

  render() {

    const { t } = this.props;

    return (
      <div>
        <ScrollToTopOnMount />
        <div className="wrapper">
          <Dashboard classSidebar={ this.state.classSidebar } />
			    <div id="content">
            <div className="container-fluid">
              <Navbar classButton={ this.state.classButton } userPhoto={ userPhoto } collapse={ this.collapse } />
              <div className="row">
                  <div className="col-12">
                    <div className="welcome-text">
                    <span className="section-topname"><i className="fas fa-credit-card mr-2"></i>Planes WingCamp</span>
                       <div className="divider-line"></div>
                      <h2 className="section-title">¡Hola, { this.props.userReducer?.data?.user || '' }! Elegí el plan en el que quieras renovar tu suscripción.</h2>
                      <p className="section-subtitle">Para continuar utilizando la plataforma, por favor seleccioná la opción que más se ajuste a tus necesidades. </p>
                    </div>
                  </div>
              </div>
            <div className="row">
              <div className="col-12 col-md-12 col-lg-6 col-xl-4 ">
               <div className="subscription-card">
                 <div className="subscription-card-header">
                   <div className="text-center">
                          <h3>Plan Único</h3>
                          <div className="d-flex align-items-center">
                                <h4 className="oldprice">$1.998</h4> <h2>$999</h2><span className="mounth">Mes</span>
                            </div>
                      </div>  
                                    
                                   
                                    
                 </div>
                 <div className="subscription-card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><i className="fas fa-check"></i> Hasta 3 usuarios perfil profesor/ administrador</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Hasta 30 clases/cursos disponibles</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Hasta 200 alumnos por clase/curso</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Hasta 200 alumnos para streaming</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Almacenamiento ilimitado</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Streaming Ilimitado</li>
                    </ul>
                    <Link to="/payment" >
                      <div className="text-center">
                        <button onClick={ () => this.setValues('999', 'Plan Único') } className="btn btn-primary rounded-buttons my-3">Abonar</button>
                      </div>
                    </Link>
                 </div>
                 {/* <div className="ribbon">
                 <a href="#">Fork me on GitHub</a>
                </div> */}
               </div>

              </div>
              <div className="col-12 col-md-12 col-lg-6 col-xl-4 ">
              <div className="subscription-card">
                 <div className="subscription-card-header">
                   <div className="text-center">
                          <h3>Único Plus</h3>
                          <div className="d-flex align-items-center">
                                <h4 className="oldprice">$9.998</h4> <h2>$4999</h2><span className="mounth">Mes</span>
                            </div>
                      </div>                         
                 </div>
                 <div className="subscription-card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><i className="fas fa-check"></i> Usuarios perfil profesor/administrador a medida</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Cantidad de clases/cursos a medida</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Alumnos por clase/curso a medida</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Alumnos para streaming a medida</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Almacenamiento ilimitado</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Streaming Ilimitado</li>
                    </ul>
                    <Link to="/payment" >
                      <div className="text-center">
                        <button onClick={ () => this.setValues('4999', 'Único Plus') } className="btn btn-primary rounded-buttons my-3">Abonar</button>
                      </div>
                    </Link>
                 </div>
               </div>

              </div>
              <div className="col-12 col-md-12 col-lg-6 col-xl-4 ">
              <div className="subscription-card">
                 <div className="subscription-card-header">
                   <div className="d-flex align-items-center text-center">
                          <h3 className="my-2">Plan Único <br/>
                          Grandes Cuentas</h3>
                         
                      </div>                         
                 </div>
                 <div className="subscription-card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><i className="fas fa-check"></i> Landing page y marketplace e-commerce integrados</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Pasarela de pagos</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Intranet y CRM Administrador</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Buscador (cursos, glosaris, etc.)</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> Almacenamiento ilimitado</li>
                      <li className="list-group-item"><i className="fas fa-check"></i> UI de la plataforma personalizada</li>
                    </ul>
                    <Link to="/payment" >
                      <div className="text-center">
                      <button className="btn btn-primary rounded-buttons my-3">Contactarse</button></div>
                    </Link>
                 </div>
               </div>

              </div>
            </div>
          </div>
        {/* </section> */}
        </div>
        </div>
      </div>
    );
  }
}

const Export = withTranslation()(Subscription)

export default connect(mapStateToProps)(Export)