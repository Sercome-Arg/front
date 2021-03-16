import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from './components/Login'
import { NotFound } from './components/NotFound'
import { Error403 } from './components/NotFound'
import { Home } from './components/Home'
import { Agenda } from './components/Agenda'
import { SanofiGenMed } from './components/SanofiGenMed'
import { SanofiPasteur } from './components/SanofiPasteur'
import { SanofiOneSanofi } from './components/SanofiOneSanofi'
import { SanofiSpecialty } from './components/SanofiSpecialty'

declare global { interface Window { Mercadopago: any } }
var Mercadopago = window.Mercadopago;

class App extends React.Component <{}, {}> {

	props: any
	static propTypes: any
	static defaultProps: any

	constructor(props: any) {
		super(props)
	}

	render() {

		return (
			<Router>
				<div>
					<Switch>
						<Route component={ Error403 } path='/unauthorized' />
						<Route component={ SanofiGenMed } path='/sanofigenmed' />
						<Route component={ SanofiPasteur } path='/sanofipasteur' />
						<Route component={ SanofiOneSanofi } path='/sanofionesanofi' />
						<Route component={ SanofiSpecialty } path='/sanofispecialty' />
						<Route component={ Home } path='/home' />
						<Route component={ Agenda } path='/agenda' />
						<Route component={ Login } path='/' />
						<Route component={ NotFound } />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App