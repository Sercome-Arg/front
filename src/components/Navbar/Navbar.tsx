import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import * as loginAction from './../../store/actions/login'

import './css/navbar.css'

import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar'


const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 35,
      height: 35,
	  border: `2px solid ${theme.palette.background.paper}`,
	  marginTop: '5px'
    },
  }),
)(Avatar);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
  }),
);

const userPhoto = require('./img/user.jpg')

function mapStateToProps(store: {
	userReducer: any,
}) {
	return {
		userReducer: store.userReducer,
	};
}

class Navbar extends React.Component<{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	// eslint-disable-next-line no-useless-constructor
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	logout = () => {
		localStorage.clear()
		this.props.dispatch(loginAction.reintentar())
	}

	render(){

		const { t } = this.props;

		let color: string = '#5600c2'

		if(this.props.color !== undefined) {
			color = this.props.color
		}

		return(
			<div className="row">
				<div className="col-12">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="container-fluid">
							<button type="button" id="sidebarCollapse" className={ this.props.classButton } onClick={ this.props.collapse }>
								<span></span>
								<span></span>
								<span></span>
							</button>						
						</div>
						<div style={{ color: color }} className="user-menu d-flex align-items-center">
							<p>¡Hola, { this.props.userReducer?.data?.user || '' }!</p>

							<Badge badgeContent={4} color="primary" className="mx-2"><MailIcon /></Badge>
							<Badge badgeContent={1} color="primary" className="mx-2"><NotificationsIcon /></Badge>
							<StyledBadge  overlap="circle"   anchorOrigin={{ vertical: 'bottom',  horizontal: 'right',  }}   variant="dot"  >
								<SmallAvatar  alt="Remy Sharp" src={ this.props.userPhoto } />
							</StyledBadge>
     

						
							<div className="dropdown show  dropleft">
								<div role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i style={{ color: color }} className="fas fa-chevron-down mt-1 mx-2"></i>
								</div>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
									<a className="dropdown-item" href="#">Mi perfil</a>
									<Link onClick={ this.logout } to='/' className="dropdown-item">Cerrar sesión</Link>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}

const Export = withTranslation()(Navbar)

export default connect(mapStateToProps)(Export)

