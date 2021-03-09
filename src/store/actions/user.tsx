import axios from 'axios';
import config from './config'
import storage from './../../config'

export function getPass(
	user: string,
  newPass: string,
) {
	
	let payload: any = axios.get(config.url + '/auth/get/' + config.company + '/' + user + '/' + newPass)
	
  return {
		type: 'GET_PASS',
		payload: payload
	}

}

export function resetPass(
  user: string
) {
	
	let payload: any = axios.get(config.url + '/auth/reset/' + config.company + '/' + user)
	
  return {
		type: 'RESET_PASS',
		payload: payload
	}

}

export function get(
  idUser: string
) {

	let project = {}
	let match = {
		_id: {
			$oid: idUser
		},
	}
	let sort = {}
	let group = {}
	let limit = 1
	let skip = 0
	
	let payload: any = axios.get(config.url + '/user' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_USER',
		payload: payload
	}

}

export function reintentar() {

	return {
		type: 'REINTENTAR_USER',
		payload: {}
	}

}