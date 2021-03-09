import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import './css/footer.css'

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
			<div className="col-12">
				<div className="bottom-text">
					<h4 className="bottom-text-thanks">¡Muchas gracias por unirte a la comunidad WingCamp{ hi }!</h4>
					<span className="bottom-text-subtitle">Antes de terminar, ayudanos a seguir creciendo.</span>
					<p style={{ color: color }} className="bottom-text-calification">Dejar una calificación sobre la nueva plataforma de WingCamp</p>
				</div>
			</div>
		);
	}
}

const Export = withTranslation()(Footer)

export default connect(mapStateToProps)(Export)