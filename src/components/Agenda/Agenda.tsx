import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import './css/styles.css'
import { Dashboard } from '../Dashboard'
import { Footer } from '../Footer'
import { WhiteNavbar } from '../Navbar'
import { AgendaGral } from '../Home'

import * as subscriptionAction from '../../store/actions/subscription'
import * as userAction from '../../store/actions/user'
import { connect } from 'react-redux'
import config from '../../config'
const Deco1 = require('./img/deco1.png')



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

	componentWillMount() {

		this.props.dispatch(subscriptionAction.reintentar())

		let userId: string | null = localStorage.getItem(config.session_user)
		if (localStorage.getItem(config.session_user) === null || localStorage.getItem(config.session_user) === undefined) this.props.history.push('/')
		if (userId !== null) this.props.dispatch(userAction.get(userId))

	}

	collapse = () => {

		if (this.state.classSidebar === '') {
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
				<div className="bg-container">
					<WhiteNavbar />
					<div className="wrapper">
						<Dashboard />
						<div className="container">	
						<div className="row">
							<div className="col-12 text-center">
								<div className="agenda-home">
									<h4 className="white-titles">Agenda general</h4>
								</div>
							</div>
						</div>			
						<AgendaGral/>		
						
						</div>
						{/* end container fluid */}
					</div>
						{/* end wrapper */}


									
				
				</div>
				{/* end bg container */}
				<Footer />
			</div>
		);
	}
}

const Export = withTranslation()(Home)

export default connect(mapStateToProps)(Export)