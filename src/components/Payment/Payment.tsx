import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from './../../config'

import './css/payment.css'

import * as mercadoPagoAction from './../../store/actions/mercadoLibre'
import * as userAction from './../../store/actions/user'
import * as permissionAction from './../../store/actions/permission'

import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Modal } from '../Modal'

const whiteLogo = require('./img/white-logo.png')
const chipImg = require('./img/chip.png')
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
  subscriptionReducer: any,
  loginReducer: any,
  permissionReducer: any,
  userReducer: any,
}) {
  return {
    userReducer: store.userReducer,
    permissionReducer: store.permissionReducer,
    loginReducer: store.loginReducer,
    languageReducer: store.languageReducer,
    mercadoPagoReducer: store.mercadoPagoReducer,
    subscriptionReducer: store.subscriptionReducer,
  };
}

class Payment extends React.Component<{}, {
  value: string,
  paymentMethodId: string,
  thumbnail: string,
  classIssuer: {},
  amount: string,
  issuerId: string,
  doSubmit: boolean,
  cardHolder: string,
  email: string,
  docType: string,
  doc: string,
  installments: string,
  description: string,
  cardNumber: string,
  cardExpireMonth: string,
  cardExpireYear: string,
  classSidebar: string,
  classButton: string,
  name: string,
  modalText: string,
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
      value: '',
      paymentMethodId: '',
      thumbnail: '',
      classIssuer: { display: 'none' },
      amount: '100',
      issuerId: '',
      doSubmit: false,
      cardHolder: '',
      email: '',
      docType: 'DNI',
      doc: '',
      installments: '1',
      description: 'Some Book',
      cardNumber: '1234 5678 9123 4567',
      cardExpireMonth: '06/',
      cardExpireYear: '25',
      classSidebar: '',
      classButton: 'navbar-btn',
      name: 'Nombre y Apellido',
      modalText: 'Nombre y Apellido',
    };
	}
	
	componentWillMount = () => {
    this.props.dispatch(permissionAction.reintentar())

		let userId: string | null = localStorage.getItem(config.session_user)
		if(localStorage.getItem(config.session_user) === null || localStorage.getItem(config.session_user) === undefined) this.props.history.push('/')
		if(userId !== null) this.props.dispatch(userAction.get(userId))
    if(userId !== null) this.props.dispatch(permissionAction.getPermissionByUser(userId))
	}

  componentDidMount() {
    if(window.Mercadopago !== undefined) {
      window.Mercadopago.setPublishableKey('TEST-8ef177e4-57b3-4d2f-a58b-cd3d960e3ca5');
      window.Mercadopago.getIdentificationTypes();
    } else {
      console.log('import mercadopago is undefined')
    }

    this.setState({
      amount: this.props?.subscriptionReducer?.data?.amount || '0',
      description: this.props?.subscriptionReducer?.data?.description || 'nothing',
      // email: this.props?.loginReducer?.data?.user?.email || '',
      // doc: this.props?.loginReducer?.data?.user?.dni || '',
      // cardHolder: this.props.userReducer?.data?.user || ''
    })
  }
  
  guessPaymentMethod = (e: any) => {

    if(e.target.value === '') {
      this.setState({
        cardNumber: '1234 5678 9123 4567'
      })  
    } else {

      this.setState({
        cardNumber: e.target.value
      })
    }

    this.cleanCardInfo();

    let cardnumber: string = e.target.value
    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0,6);
      window.Mercadopago.getPaymentMethod({
        "bin": bin
      }, this.setPaymentMethod)
    }
  }

  cleanCardInfo = () => {

    this.setState({
      thumbnail: '',
      classIssuer: { display: 'none' }
    })

    let issuer: any = document.getElementById('issuer')
    let installments: any = document.getElementById('installments')

    issuer.options.length = 0;
    installments.options.length = 0;
  }

  setPaymentMethod = (status: any, response: any) => {
    if (status === 200) {
      let paymentMethod = response[0];

      this.setState({
        paymentMethodId: paymentMethod.id,
        thumbnail: paymentMethod.thumbnail
      })

      if(paymentMethod.additional_info_needed.includes("issuer_id")) {

        this.getIssuers(paymentMethod.id);
      } else {
        this.setState({
          classIssuer: { display: 'none' }
        })

        this.getInstallments(
          paymentMethod.id,
          this.state.amount
        );
      }

    } else {
        alert(`payment method info error: ${response}`);
    }
  }

  getIssuers = (paymentMethodId: any) => {
    window.Mercadopago.getIssuers(
      paymentMethodId, 
      this.setIssuers
    );
  }

  setIssuers = (status: any, response: any) => {
    if (status === 200) {
      let issuerSelect: any = document.getElementById('issuer')

      response.forEach( (issuer: any) => {
        let opt = document.createElement('option');
        opt.text = issuer.name;
        opt.value = issuer.id;
        issuerSelect.appendChild(opt);
      });
      
      if(issuerSelect.options.length <= 1){
        this.setState({
          classIssuer: { display: 'none' }
        })
      } else {
        this.setState({
          classIssuer: {}
        })
      }

      this.setState({
        issuerId: issuerSelect.value
      })

      this.getInstallments(
        this.state.paymentMethodId,
        this.state.amount,
        this.state.issuerId
      );

    } else {
      alert(`issuers method info error: ${response}`);
    }
  }

  getInstallments(paymentMethodId: any, amount: any, issuerId?: any){
    window.Mercadopago.getInstallments({
      "payment_method_id": paymentMethodId,
      "amount": parseFloat(amount),
      "issuer_id": issuerId ? parseInt(issuerId) : undefined
    }, this.setInstallments);
  }

  setInstallments = (status: any, response: any) => {
    if (status === 200) {

      let installments: any = document.getElementById('installments')
      installments.options.length = 0;
      response[0].payer_costs.forEach( (payerCost: any) => {
        let opt = document.createElement('option');
        opt.text = payerCost.recommended_message;
        opt.value = payerCost.installments;
        installments.appendChild(opt);
      });
    } else {
      alert(`installments method info error: ${response}`);
    }
  }

  updateInstallmentsForIssuer = (e: any) => {
    window.Mercadopago.getInstallments({
        "payment_method_id": this.state.paymentMethodId,
        "amount": parseFloat(this.state.amount),
        "issuer_id": parseInt(this.state.issuerId)
    }, this.setInstallments);
  }

  getCardToken = (e: any, enabled: boolean) => {
    e.preventDefault();

    this.openModal?.current?.click()

    if(enabled) {
      if(!this.state.doSubmit){
        let $form = document.getElementById('paymentForm');
        window.Mercadopago.createToken($form, this.setCardTokenAndPay);
        return false;
      }
    } else {
      this.setState({
				modalText: 'No está autorizado para realizar esta acción.'
			})
    }
    
  }

  setCardTokenAndPay = (status: any, response: any) => {

    if (status == 200 || status == 201) {

      let payment: any = {
        email: this.state.email,
        docType: this.state.docType,
        docNumber: this.state.doc.toString(),
        installments: this.state.installments,
        transactionAmount: this.state.amount,
        paymentMethodId: this.state.paymentMethodId,
        description: this.state.description,
        token: response.id
      }

      this.props.dispatch(mercadoPagoAction.processPayment(payment))

    } else {
      alert("Este token ya fue usado!\n"+JSON.stringify(response, null, 4));
    }
  };

  cardHolderGet = (e: any) => {

    if(e.target.value === '') {
      this.setState({
        name: 'Nombre y Apellido',
        cardHolder: '',
      })  
    } else {
      this.setState({
        cardHolder: e.target.value,
        name: e.target.value
      })
    }

  }
  cardExpireMonthGet = (e: any) => {

    if(e.target.value === '') {
      this.setState({
        cardExpireMonth: '06/'
      })  
    } else {
      this.setState({
        cardExpireMonth: e.target.value + '/ '
      })
    }

  }
  cardExpireYearGet = (e: any) => {

    if(e.target.value === '') {
      this.setState({
        cardExpireYear: ' 25'
      })  
    } else {
      this.setState({
        cardExpireYear: e.target.value
      })
    }

  }

  emailGet = (e: any) => {
    this.setState({
      email: e.target.value
    })
  }

  docTypeGet = (e: any) => {
    this.setState({
      docType: e.target.value
    })
  }

  docGet = (e: any) => {
    this.setState({
      doc: e.target.value
    })
  }

  installmentsGet = (e: any) => {
    this.setState({
      installments: e.target.value
    })
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

		if(this.props.mercadoPagoReducer.fetched) {
      this.props.history.push('/paymentList')
		}
		this.closeModal?.current?.click()
    this.props.dispatch(mercadoPagoAction.reintentar())
    this.setState({
			modalText: ''
		})
	}

  render() {

    const { t } = this.props;

    let modalText: string = ''
    let permissions: {
			number: string
		}[] = []
		let BASE: any = {}
		let paymentCreateEnabled: boolean = false

    if(this.props.mercadoPagoReducer.fetched) {
      modalText = this.props?.mercadoPagoReducer?.message || ''
    } else {
			if(this.state.modalText !== '') {
				modalText = this.state.modalText
			} else {
				modalText = this.props?.mercadoPagoReducer?.message || ''
			}
		}

    if(this.props.permissionReducer) {
			permissions = this.props.permissionReducer.data
			BASE = this.props.permissionReducer.base
		}

		if(Array.isArray(permissions)) {
			permissions.map((permission: {
				number: string
			}) => {
				if(permission.number === BASE.createPayment) paymentCreateEnabled = true
			})
		}

    return (
      <div>
        <ScrollToTopOnMount />
        <div className="wrapper">
        <Dashboard classSidebar={ this.state.classSidebar } />
         {/* <!-- Page Content Holder --> */}
         <div id="content">
        {/* <section className="payment d-flex align-items-center justify-content-center"> */}
          <div className="container-fluid">            
          <Navbar classButton={ this.state.classButton } userPhoto={ userPhoto } collapse={ this.collapse } />
          <div className="row">
            <div className="col-12">
              <div className="welcome-text">
                <span className="section-topname"><i className="fas fa-credit-card mr-2"></i>Renovación de suscripcion</span>
                <div className="divider-line"></div>
                <h2 className="section-title">{ this.props.userReducer?.data?.user || '' }, renová ahora la suscripción online de tu plan <b>{ this.state.description }</b></h2>
                <p className="section-subtitle">Completá el formulario con los datos de tu tarjeta. El proceso es 100% seguro.</p>
              </div>
            </div>				
				</div>
          <div className="row" id="background-color">
            <div className="col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
              <div>
            <h4>Plan { this.state.description }, $ { this.state.amount },00</h4>
            <p>Renovación por 12 meses</p>
                    <div className="card-bg">
                  <div className="card-draw">
                      <div className="d-flex justify-content-between card-img">
                        <div><img className="" src={chipImg} alt="" width="60px" /> </div>
                        {
                          (this.state.thumbnail !== '') ? <div><img className="card-bank-logo" src={ this.state.thumbnail } alt="" /></div> : <div><img className="" src={ whiteLogo } alt=""  width="160px" /></div>
                        }
                      </div>
                      <p className="card-number">{ this.state.cardNumber }</p>
                      <div className="card-name d-flex justify-content-between text-uppercase">
                        <p>{ this.state.name }</p>
                        <div className="d-flex">
                        <p>{ this.state.cardExpireMonth }</p>
                        <p>{ this.state.cardExpireYear }</p></div>
                    
                      </div>
                    </div>
                  </div>    
                  </div>
                  </div>		
            <div className="col-12 col-lg-6 col-md-12">
              
            <form action="/process_payment" method="post" id="paymentForm" className="payment-method">
                      <h5 className="title">Detalles del comprador</h5>
                      <div className="row">
                        <div className="form-group col">
                          <label htmlFor="email">Correo electrónico</label>
                          <input value={ this.state.email } onChange={ this.emailGet } id="email" name="email" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-5">
                          <label htmlFor="docType">Tipo de documento</label>
                          <select onChange={ this.docTypeGet } id="docType" name="docType" data-checkout="docType" className="form-control"></select>
                        </div>
                        <div className="form-group col-sm-7">
                          <label htmlFor="docNumber">Número de documento</label>
                          <input value={ this.state.doc.toString() } onChange={ this.docGet } id="docNumber" name="docNumber" data-checkout="docNumber" type="text" className="form-control" />
                        </div>
                      </div>
                      <br />
                      <h5 className="title">Detalles de la tarjeta</h5>
                      <div className="row">
                        <div className="form-group col-sm-8">
                          <label htmlFor="cardholderName">Nombre y apellido</label>
                          <input value={ this.state.cardHolder } maxLength={ 24 } onChange={ this.cardHolderGet } id="cardholderName" data-checkout="cardholderName" type="text" className="form-control"/>
                        </div>
                        <div className="form-group col-sm-4">
                          <label htmlFor="">Vencimiento</label>
                          <div className="input-group expiration-date">
                            <input type="text" className="form-control" placeholder="MM" maxLength={2} onChange={ this.cardExpireMonthGet } id="cardExpirationMonth" data-checkout="cardExpirationMonth" onPaste={() => { return false }} onCopy={() => { return false }} onCut={() => { return false }} onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                            <span className="date-separator">/</span>
                            <input type="text" className="form-control" placeholder="YY" maxLength={2} onChange={ this.cardExpireYearGet } id="cardExpirationYear" data-checkout="cardExpirationYear" onPaste={() => { return false }} onCopy={() => { return false }} onCut={() => { return false }} onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                          </div>
                        </div>
                        <div className="form-group col-sm-8">
                          <label htmlFor="cardNumber">Número</label>
                          <input onChange={ this.guessPaymentMethod } maxLength={ 16 } type="text" className="form-control input-background" id="cardNumber" data-checkout="cardNumber" onPaste={() => { return false }} onCopy={() => { return false }} onCut={() => { return false }} onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                        </div>
                        <div className="form-group col-sm-4">
                          <label htmlFor="securityCode">Código de seguridad</label>
                          <input id="securityCode" data-checkout="securityCode" type="text" className="form-control" onPaste={() => { return false }} onCopy={() => { return false }} onCut={() => { return false }} onDrag={() => { return false }} onDrop={() => { return false }} autoComplete="off" />
                        </div>                                         
                        <div id="issuerInput" className='form-group col-sm-12 col-lg-6' style={ this.state.classIssuer }>
                          <label htmlFor="issuer">Banco</label>
                          <select onChange={ this.updateInstallmentsForIssuer } id="issuer" name="issuer" data-checkout="issuer" className="form-control"></select>
                        </div>
                        <div className="form-group col-sm-12 col-lg-6">
                          <label htmlFor="installments">Cuotas</label>
                          <select onChange={ this.installmentsGet } id="installments" name="installments" className="form-control"></select>
                        </div> 
                        <div className="form-group col-sm-12">
                          <input value={ this.state.amount } type="hidden" name="transactionAmount" id="amount" />
                          <input value={ this.state.paymentMethodId } type="hidden" name="paymentMethodId" id="paymentMethodId" />
                          <input type="hidden" name="description" id="description" value='asd' />
                          <br />
                          <div className=" d-flex justify-content-center">
                            <button onClick={ (e: any) => this.getCardToken(e, paymentCreateEnabled) } type="button" className="btn btn-primary rounded-buttons">Abonar suscripción</button>
                          </div>
                          <br />
                        </div>
                      </div>
                    </form>

                </div>				
				      </div>
            </div>
          </div>
        </div>
        <Modal
					modalRef={ this.openModal }
					closeRef={ this.closeModal }
					modalText={ modalText }
					title={ 'Pagos' }
          modalAceptar={ this.modalAceptar }
          fetching={ this.props?.mercadoPagoReducer?.fetching || false }
				/>
      </div>
    );
  }
}

const PaymentExport = withTranslation()(Payment)

export default connect(mapStateToProps)(PaymentExport)