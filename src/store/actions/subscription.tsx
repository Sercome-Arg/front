import axios from 'axios';
import config from './config'
import storage from './../../config'

export function setValues(
	amount: string,
	description: string
) {

	return {
		type: 'SET_VALUES',
		payload: {
			amount,
			description
		}
	}

}

export function reintentar() {

	return {
		type: 'REINTENTAR_SUBSCRIPTION',
		payload: {}
	}

}

export function get(
	idUser: string | null
) {

	let project = {}
	let match = {
    operationType : { $ne: "D" },
    user: {
      $oid: idUser
    }
	}
	let sort = {}
	let group = {}
	let limit = 0
	let skip = 0
	
	let payload: any = axios.get(config.url + '/subscription' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_SUBSCRIPTION',
		payload: payload
	}

}