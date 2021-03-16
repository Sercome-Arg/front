import axios from 'axios';
import Cookies from 'universal-cookie';
import config from './config'

export function loginVerified(password: string) {

	let payload: any = axios.post(config.url + '/auth/loginverified?database=' + config.company, {
		password
	})

	return {
		type: 'LOGIN_VERIFIED',
		payload: payload
	}

}

export function loginWithUser(user: string, password: string) {

	let payload: any = axios.post(config.url + '/auth/loginwithuser?database=' + config.company, {
		user,
		password
	})

	return {
		type: 'LOGIN_WITH_USER',
		payload: payload
	}

}

export function reintentar() {

	return {
		type: 'REINTENTAR_LOGIN',
		payload: {}
	}

}

export function loguear( cookies: Cookies, empresaId: string ) {

	cookies.set('empresaId', empresaId, { path: '/' });

	return {
		type: 'LOGUEAR',
		payload: {}
	}

}

export function set(message: string, user: any, status: number) {

	let payload: any = {
		data: {
			message: message,
			result: user,
			status: status
		}
	}

	return {
		type: 'INGRESAR_SET',
		payload: payload
	}

}

export function login(email: string, password: string) {

	let payload: any = axios.post(config.url + '/auth/login?database=' + config.company, {
		email,
		password
	})

	return {
		type: 'INGRESAR',
		payload: payload
	}

}

export function loginGoogle(user: string, pass: string) {

	let payload: any = axios.post(config.url + '/auth/login?database=' + config.company, {
		email: user,
		password: pass
	})

	return {
		type: 'INGRESAR_GOOGLE',
		payload: payload
	}

}

export function loginGoogleFailure(user: string, pass: string) {

	let payload: any = axios.post(config.url + '/auth/login?database=' + config.company, {
		email: user,
		password: pass
	})

	return {
		type: 'INGRESAR_FAILURE',
		payload: payload
	}

}

export function loginFacebook(user: string, pass: string) {

	let payload: any = axios.post(config.url + '/auth/login?database=' + config.company, {
		email: user,
		password: pass
	})

	return {
		type: 'INGRESAR_FACEBOOK',
		payload: payload
	}

}

export async function register(empresa: {
	empresa: {
		nombre: string,
		cuit: string,
		usuario: string,
		clave: string,
		email: string,
		rubros: [
				null
		]
	}
}) {

	let url: string = 'http://127.0.0.1:8000';
	let payload: any

	await axios.post(url + '/registro', empresa)
	.then((response) => {
		console.log(response);
		payload = response
	})
	.catch((err) => {
		console.log(err);
		payload = err
	});

	// console.log('estoy en apiWork, y su payload es:' + payload);

	return {
			type: 'API_WORK',
			payload: 'payload'
	}

}