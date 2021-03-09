import axios from 'axios';
import config from './config'
import storage from './../../config'

export function getForUser(
	idUser: string | null,
) {

	let project = {}
	let match = {
		operationType : { $ne: "D" },
		creationUser: {
			$oid: idUser
		},
	}
	let sort = {}
	let group = {}
	let limit = 0
	let skip = 0
	
	let payload: any = axios.get(config.url + '/payment' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_PAYMENT_FOR_USER',
		payload: payload
	}

}