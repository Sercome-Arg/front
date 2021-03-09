import axios from 'axios';
import config from './config'
import storage from './../../config'

export function get(profile: string) {

	let payload: any = axios.get(config.url + '/user/' + profile, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })

	return {
		type: 'GET_PROFILE',
		payload: payload
	}

}

export function setear() {

	return {
		type: 'SETEAR_PROFILE',
		payload: {}
	}

}