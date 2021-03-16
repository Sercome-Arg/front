import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner'

import * as appAction from '../../store/actions/app'

import './css/modal.css'

function mapStateToProps(store: {}) {
	return {};
}

class Modal extends React.Component<{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	button = (color: string) => {
		if(this.props.fetching) {
			return <button className="btn btn-primary violet-buttons my-4">    
				<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
			</button>
		} else {
			return <button onClick={ this.props.modalAceptar } className="btn btn-primary violet-small-buttons">Aceptar</button>
		}
	}

	aceptar = () => {
		this.props.modalAceptar()
		this.props.dispatch(appAction.setColor(this.props.color))
	}

	render(){

		const { t } = this.props;

		let modalText: string = ''
		let color: string = '#5600c2'
		let links: {
			url: string,
			name: string,
			_id: string
		}[] = []

		let files: {
			url: string,
			name: string
		}[] = []

		if(this.props.modalText !== undefined) {
			modalText = this.props.modalText
		}

		if(this.props.color !== undefined) {
			color = this.props.color 
		}

		if(this.props.links !== undefined && Array.isArray(this.props.links)) {
			links = this.props.links
		}

		if(this.props.files !== undefined) {
			files = this.props.files
		}

		return(
			<div>

				<button ref={ this.props.modalRef } hidden type="button" className="btn btn-primary" data-toggle="modal" data-target="#alerts-modal">L</button>
				<div className="modal fade" id="alerts-modal"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header border-0">
					
								<button onClick={ this.aceptar } style={{ color: color }} ref={ this.props.closeRef }  type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body text-center">
								<h5>{ this.props.title }</h5>
								<p>{ this.props.modalText }</p>
								{
									links.map((link: {
										_id: string,
										url: string,
										name: string
									}) => {
										return <div onClick={ this.props.modalAceptar }>
											<i style={{ color: color }} className="fa fa-at mt-1 mx-2 "></i>
											<Link to={ '/link/' + link._id } >Link a: { link.name }</Link>
											<br />
										</div>
									})
								}
								{
									files.map((file: {
										url: string,
										name: string
									}) => {
										return <div>
											<i style={{ color: color }} className="fa fa-at mt-1 mx-2 "></i>
											<a target="_blank" href={ process.env.REACT_APP_BASE_URL + '/image/' + file.url } >Link a: { file.name }</a>
											<br />
										</div>
									})
								}
							</div>
							<div className="modal-footer border-0"></div>
							<div className="text-center">
								{
									this.button(color)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const Export = withTranslation()(Modal)

export default connect(mapStateToProps)(Export)