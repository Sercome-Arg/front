import axios from 'axios'
import config from './config'
import storage from './../../config'

export function getLink(
	idLink: string | null
) {

	let project = {}
	let match = {
		operationType : { $ne: "D" },
		_id: {
			$oid: idLink
		},
	}
	let sort = {}
	let group = {}
	let limit = 1
	let skip = 0
	
	let payload: any = axios.get(config.url + '/link' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_LINK',
		payload: payload
	}

}

export function getLinksForCourse(
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
	
	let payload: any = axios.get(config.url + '/link' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_LINKS_FOR_COURSE',
		payload: payload
	}

}

export function getLinksByUser(
	idUser: string | null
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
	
	let payload: any = axios.get(config.url + '/link' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_LINKS_FOR_USER',
		payload: payload
	}

}

export function reintentar() {

	return {
		type: 'REINTENTAR_LINK',
		payload: {}
	}

}

export function setLink(
    url: string,
		course: string,
		name: string
) {
	
	let payload: any = axios.post(config.url + '/link', {
		url,
		course,
		name
	}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'SET_LINK',
		payload: payload
	}

}
