import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import './css/notFound.css'

const whiteLogo = require('./img/white-logo.png')
const bgImg = require('./img/bg-notfound.jpg')
const notfoundImg = require('./img/img-notfound.png')

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {}) {
	return {};
}

class NotFound extends React.Component<{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		localStorage.clear()
	}

	render(){

		const { t } = this.props;

		return(
			<div>
		
			<ScrollToTopOnMount />

				<section className="notfound d-flex align-items-center">
					<div className="container">
						<div className="row ">
							<div className="col-12 d-flex justify-content-center align-items-center">
								<div className="text-center">
								<img className="img-fluid" src={ whiteLogo } alt="" /> 
								<img className="img-fluid" src={ notfoundImg } alt="" /> 
								<h4><b>Error 404.</b> La página solicitada no existe.</h4>
									<Link to="/" ><button className="btn btn-primary rounded-white-buttons mt-3">Volver al inicio</button></Link>
								</div>
							</div>
						</div>
					</div>
			
				</section>
			 
			</div>
		);
	}
}

const Export = withTranslation()(NotFound)

export default connect(mapStateToProps)(Export)