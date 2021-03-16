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

export function uploadProfilePicture(file: File) {

	let formData = new FormData();

	formData.append('image', file)
	let payload = axios.post(config.url + '/image', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

  return {
		type: 'UPDATE_PROFILE_PICTURE',
		payload: payload
	}
}

export function updateProfileData(profile: string, newData: object) {

	let payload = axios.put(config.url + '/user/' + profile, newData, {
		headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
	})

  return {
		type: 'UPDATE_PROFILE_DATA',
		payload: payload
	}
}