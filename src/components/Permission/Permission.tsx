import React from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import * as subscriptionAction from './../../store/actions/subscription'
import * as userAction from './../../store/actions/user'
import * as permissionAction from './../../store/actions/permission'

import storage from './../../config'

function mapStateToProps(store: {
	subscriptionReducer: any,
	userReducer: any,
	permissionReducer: any,
}) {
	return {
		permissionReducer: store.permissionReducer,
		userReducer: store.userReducer,
		subscriptionReducer: store.subscriptionReducer,
	};
}

class Permission extends React.Component<{}, {
	allowed: boolean
}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {
			allowed: true
		};
	}

	componentDidUpdate() {
		if(
			localStorage.getItem(storage.session_token) === undefined ||
			localStorage.getItem(storage.session_token) === null
		) {
			this.props.history.push('/')
		} else {

			if(
				this.props.permissionReducer.fetched &&
				Array.isArray(this.props.permissionReducer.data) &&
				this.state.allowed
			) {
				let permissions: any [] = this.props.permissionReducer.data
				let permission: boolean = false
	
				permissions.map((perm: {
					name: string,
					number: string
				}) => {
					if(perm.number === this.props.permission) permission = true
				})
	
				if(this.state.allowed && !permission) this.setState({ allowed: permission })
				
			}
	
			if(!this.state.allowed) {
				this.props.history.push('/notfound')
			} else {
				if(this.props.subscriptionReducer.fetched) {
					if(this.props.subscriptionReducer.status === 200) {
						
						let subscriptions: any[] = this.props.subscriptionReducer.data
						let lastSubscription: number = 0
	
						if(subscriptions !== undefined && Array.isArray(subscriptions)) {
							subscriptions.map((subscription: any) => {
		
								if(lastSubscription < subscription.end) {
									lastSubscription = subscription.end
								}
		
							})
						}
	
						if(Date.parse(new Date().toString()) > lastSubscription) {
							this.props.history.push('/subscription')
						}
	
					}
				}
			}
			
		}
	}

	componentWillMount = () => {
		this.props.dispatch(subscriptionAction.get(localStorage.getItem(storage.session_user)))

		let userId: string | null = localStorage.getItem(storage.session_user)
		if(localStorage.getItem(storage.session_user) === null || localStorage.getItem(storage.session_user) === undefined) this.props.history.push('/')
		if(userId !== null) this.props.dispatch(userAction.get(userId))
		if(userId !== null) this.props.dispatch(permissionAction.getPermissionByUser(userId))
	}

	render(){
		return(<div />);
	}
}

const Export = withTranslation()(Permission)

export default connect(mapStateToProps)(Export)