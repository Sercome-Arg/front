import axios from 'axios';
import config from './config'

import storage from './../../config'

export function getFileBase64(
	name: string
) {
	
	let payload: any = axios.get(config.url + '/image/base64/' + name)
	
  return {
		type: 'GET_FILE_64',
		payload: payload
	}

}

export function getFile(
	id: string
) {

	let project = {}
	let match = {
		operationType : { $ne: "D" },
		_id: {
			$oid: id
		},
	}
	let sort = {}
	let group = {}
	let limit = 1
	let skip = 0
	
	let payload: any = axios.get(config.url + '/file' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_FILE',
		payload: payload
	}

}

export function getFileForCourse(
	idCourse: string
) {

	let project = {}
	let match = {
		operationType : { $ne: "D" },
		course: {
			$oid: idCourse
		},
	}
	let sort = {}
	let group = {}
	let limit = 0
	let skip = 0
	
	let payload: any = axios.get(config.url + '/file' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_FILES_FOR_COURSE',
		payload: payload
	}
}

export function upload(file: File) {

	var formData = new FormData();

	formData.append('image', file)
	let payload = axios.post(config.url + '/image', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

  return {
		type: 'UPLOAD_FILE',
		payload: payload
	}

}

export function getFiles() {

	let project = {}
	let match = {
		operationType : { $ne: "D" },
		creationUser: {
			$oid: localStorage.getItem(storage.session_user)
		},
	}
	let sort = {}
	let group = {}
	let limit = 0
	let skip = 0
	
	let payload: any = axios.get(config.url + '/file' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_FILES',
		payload: payload
	}

}

export function reintentar() {

	return {
		type: 'REINTENTAR_FILE',
		payload: {}
	}

}

export function setFile(
		name: string,
		url: string,
		course: string,
		
) {
	
	let payload: any = axios.post(config.url + '/file', {
		name,
		url,
		course,

	}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'SET_FILE',
		payload: payload
	}

}
