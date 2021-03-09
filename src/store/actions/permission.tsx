import axios from 'axios'
import config from './config'
import storage from './../../config'

export function getPermissionByUser(
	id: string
) {
	
	let payload: any = axios.get(config.url + '/permission/by?user=' + id, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
	})
	
  return {
		type: 'GET_PERMISSION_BY_USER',
		payload: payload,
	}

}


export function reintentar() {

	return {
		type: 'REINTENTAR_PERMISSION',
		payload: {}
	}

}
