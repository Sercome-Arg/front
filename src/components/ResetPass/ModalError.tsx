import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner'

import * as appAction from '../../store/actions/app'


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



	
	render(){

		const { t } = this.props;

		return(
			<div>

				<button ref={ this.props.modalRef } hidden type="button" className="btn btn-primary" data-toggle="modal" data-target="#alerts-modal">L</button>
				<div className="modal fade" id="alerts-modal"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header border-0">
					
								<button  type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body text-center">
								<h5>Mensaje del sistema</h5>
								<p>Los usuarios estudintes solo pueden restrablecer su contraseña poniendose en contacto con su profesor.</p>

								
							</div>
							<div className="modal-footer border-0"></div>
							<div className="text-center">
							<button className="btn btn-primary rounded-buttons mt-4">Aceptar</button>
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