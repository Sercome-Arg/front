import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import './css/footer.css'
const whiteLogo = require('./img/white-logo.png')

function mapStateToProps(store: {
	appReducer: any,
	userReducer: any,
}) {
	return {
		userReducer: store.userReducer,
		appReducer: store.appReducer,
	};
}

class Footer extends React.Component<{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	render(){

		let color: string = '#5600c2'
	
		if(this.props.appReducer.color !== '') {
			color = this.props.appReducer.color
		}

		if(this.props.color !== undefined) {
			color = this.props.color
		}

		let hi: string = ''

		if(this.props.userReducer?.data?.user) {
			hi = ', ' + this.props.userReducer?.data?.user || ''
		}
		
		return(
			<footer>
			
							<div className="violet-footer">
								<div className="container">
									<div className="row">
											<div className="col-12 col-md-6 d-flex">
												<div>
											<img width="140px" className="navbar-brand" src={whiteLogo} alt="" /></div>
											<p className="welcome-footer">Bienvenido a <br/><b>Sanofi Cono Sur</b> </p>
											</div>
											<div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
												<div className="margin-responsive">
											<p className="follow-us">Contacto: <a href="https://api.whatsapp.com/send?phone=541123800546" target="blank" className="follow-us-number">+54 9 11 23800546</a></p>								
											<p className="follow-us"> <a href="mailto:helpdesk@kickoff2021conosur.com" target="blank" className="follow-us-number">helpdesk@kickoff2021conosur.com</a></p>								
											
											
											
											</div>
											</div>
									</div>
								</div>
							</div>
					
					
							<div className="black-footer">

							</div>
					
						
							<div className="blue-footer">

							</div>
				
			
			</footer>
		);
	}
}

const Export = withTranslation()(Footer)

export default connect(mapStateToProps)(Export)