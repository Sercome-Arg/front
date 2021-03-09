import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import PERMISSIONS from './../config'

import * as linkAction from '../../store/actions/link'

import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Permission } from '../Permission'

import './css/salaconfig.css'

const userPhoto = require('./img/user.jpg')

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {
	languageReducer: any,
	linkReducer: any,
	courseReducer: any,
	appReducer: any,
}) {
	return {
		appReducer: store.appReducer,
		courseReducer: store.courseReducer,
		linkReducer: store.linkReducer,
		languageReducer: store.languageReducer,
	};
}

class LinkList extends React.Component<{}, {
	classSidebar: string,
	classButton: string,
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
		this.props.dispatch(linkAction.getLink(this.props.match.params.id))
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

	render(){

		const { t } = this.props;

		let link: any = {}
		let color: string = '#5600c2'

		if(this.props.linkReducer.fetched) {
			link = this.props.linkReducer?.data || {}
		}

		if(this.props.appReducer.color !== '') {
			color = this.props.appReducer?.color || '#5600c2'
		}

		if(this.props.courseReducer.fetched) {
			color = this.props.courseReducer?.data?.color || '#5600c2'
		}

		return(
			<div>
				<ScrollToTopOnMount />
				<Permission permission={ PERMISSIONS.viewLinkView } { ...this.props }/>
				<div className="wrapper">
					<Dashboard color={ color } classSidebar={ this.state.classSidebar } />
					<div id="content">
						<div className="container-fluid">
							<Navbar color={ color } classButton={ this.state.classButton } userPhoto={ userPhoto } collapse={ this.collapse } />
							<div className="row">
								<div className="col-12">
									<div className="welcome-text">
										<span style={{ color : color }} className="section-topname"><i className="fas fa-briefcase mr-1"></i> Link</span>
										<div className="divider-line"></div>
											<h2 className="section-title">Link a: { link.name }</h2>
											<p className="section-subtitle">Desde esta sección podrás ver el siguiente link: { link.name }</p>
										</div>
									</div>
									<div className="col-12">
										<div className="welcome-text">
											<iframe
												title= 'video'
												frameBorder='0'
												width='100%' 
												height='560'
										 		src={ link.url } 
										 		allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' >											 
										 	</iframe>
										</div>
									</div>
									<Footer />
								</div>
							<div className="line"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const Export = withTranslation()(LinkList)

export default connect(mapStateToProps)(Export)
