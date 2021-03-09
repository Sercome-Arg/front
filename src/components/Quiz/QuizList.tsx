import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import config from '../../config'

import * as subscriptionAction from '../../store/actions/subscription'
import * as quizAction from '../../store/actions/quiz'
import * as appAction from '../../store/actions/app'

import { Dashboard } from '../Dashboard'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'

import storage from '../../config'
import TextField from '@material-ui/core/TextField';
import { QuizTable } from '.';

const userPhoto = require('./img/user.jpg')

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

function mapStateToProps(store: {
	subscriptionReducer: any,
	linkReducer: any,
	quizReducer: any,
}) {
	return {
		quizReducer: store.quizReducer,
		linkReducer: store.linkReducer,
		subscriptionReducer: store.subscriptionReducer,
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

	componentDidUpdate() {
		if(
			localStorage.getItem(config.session_token) === undefined ||
			localStorage.getItem(config.session_token) === null
		) {
			this.props.history.push('/')
		} else {
			if(this.props.subscriptionReducer.fetched) {
				if(this.props.subscriptionReducer.status === 200) {
					
					let subscriptions: any[] = this.props.subscriptionReducer.data
					let lastSubscription: number = 0

					if(subscriptions !== undefined) {
						subscriptions.map((subscription: any) => {
							if(lastSubscription < subscription.end) lastSubscription = subscription.end
						})
					}

					if(Date.parse(new Date().toString()) > lastSubscription) this.props.history.push('/subscription')

				}
			}
		}
	}

	componentWillMount() {
		this.props.dispatch(subscriptionAction.get(localStorage.getItem(storage.session_user)))
		this.props.dispatch(appAction.reintentar())
		
		this.props.dispatch(quizAction.getQuizs())
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
  
		let quizList: any[] = []

		if(this.props.quizReducer.fetched) {
			quizList = this.props.quizReducer.data
		}

		return(
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
										<span className="section-topname"><i className="far fa-question-circle mr-1"></i>Encuestas</span>
										<div className="divider-line"></div>
											<h2 className="section-title">Lista de Encuestas</h2>
											<p className="section-subtitle">Desde esta sección podrás consultar, ver y editar las encuestas creadas hasta el momento.</p>
										</div>
									</div>
									<div className="col-12">
										<div className="welcome-text">
                                            <form className={this.props.classes.root} noValidate autoComplete="off"> 
                                            <div className="form-row my-4">
                                            <div className="col-12 col-lg-4">
                                            <TextField id="outlined-basic" label="Buscar por nombre" variant="outlined" size="small" fullWidth /></div>
                                            <div className="col-12 col-lg-4">
                                                            <button  className="btn btn-primary rounded-buttons"> Buscar examen</button>
                                            </div>
                                            </div>

                                            </form>
											<div className="my-4">
											<QuizTable quizList={ quizList } /></div>
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