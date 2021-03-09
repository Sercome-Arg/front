import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from './../../config'

import './css/verified.css'

import * as loginAction from './../../store/actions/login'

const whiteLogo = require('./img/white-logo.png')
const blacktextLogo = require('./img/black-text-logo.png')

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {
	loginReducer: any,
	registerReducer: any,
	languageReducer: any
}) {
	return {
		loginReducer: store.loginReducer,
		registerReducer: store.registerReducer,
		languageReducer: store.languageReducer
	};
}

class Verified extends React.Component<{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	componentDidUpdate() {

    if(!(localStorage.getItem(config.session_token) !== undefined && localStorage.getItem(config.session_token) !== null)) {
      if(this.props.loginReducer.fetched) {
        if(this.props.loginReducer.status === 200) {
          let sessionId: string = this.props.loginReducer?.data?.session?._id || null
          let token: string = this.props.loginReducer?.data?.token?.token || null
					let userId: string = this.props.loginReducer?.data?.user?._id || null
					let verified: boolean = this.props.loginReducer?.data?.user?.mailVerified || true
					

          localStorage.setItem(config.session_token, token)
          localStorage.setItem(config.session_id, sessionId)
          localStorage.setItem(config.session_user, userId)


        } else {
          localStorage.clear()
        }
      } else {
        if(this.props.registerReducer.fetched) {
          if(this.props.registerReducer.status === 200) {
            let sessionId: string = this.props.registerReducer?.data?.session?._id || null
            let token: string = this.props.registerReducer?.data?.token?.token || null
            let userId: string = this.props.registerReducer?.data?.user?._id || null

            localStorage.setItem(config.session_token, token)
            localStorage.setItem(config.session_id, sessionId)
            localStorage.setItem(config.session_user, userId)

          } else {
            localStorage.clear()
          }
        } else {
          localStorage.clear()
        }
      }
		}
	}

	componentWillMount() {
		this.props.dispatch(loginAction.loginVerified(this.props.match.params.id))
	}

	verified = () => {

	}

	render(){

		const { t } = this.props;

		return(
			<div>
		
			<ScrollToTopOnMount />

				<section className="verified d-flex align-items-center">
					<div className="container">
						<div className="row ">
							<div className="col-12">
							<div className="verified-message">
								<div className="text-center mb-3">
								<img className="my-3 blacktext-logo" src={ blacktextLogo } alt="" /> 
								<h3>¡Ya sos parte de la comunidad WingCamp!</h3>
								<p>Muchas gracias por validar tu email. Puedes continuar navegando la plataforma.</p>
								</div>
							
								
								<div className="text-center">
									<Link to="/home" onClick={ this.verified }><button className="btn btn-primary rounded-buttons mt-4">Volver al inicio</button></Link>
								</div>
								</div>
							</div>
						</div>
					</div>
			
				</section>


		
			 
			</div>
		);
	}
}

const Export = withTranslation()(Verified)

export default connect(mapStateToProps)(Export)