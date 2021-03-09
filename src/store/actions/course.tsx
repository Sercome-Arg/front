import axios from 'axios'
import config from './config'
import storage from './../../config'

export function getCourse(
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
	
	let payload: any = axios.get(config.url + '/course' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_COURSE',
		payload: payload
	}

}

export function getCoursesForStudent() {
	
	let payload: any = axios.get(config.url + '/course/by?student=' + localStorage.getItem(storage.session_user), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_COURSES_BY_STUDENT',
		payload: payload
	}
}

export function getCourses() {

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
	
	let payload: any = axios.get(config.url + '/course' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_COURSES',
		payload: payload
	}
}

export function reintentar() {

	return {
		type: 'REINTENTAR_COURSE',
		payload: {}
	}

}

export function setCourse(
	name: string,
	description: string,
	price: number,
	start: Date | null,
	end: Date | null,
	color: string,
	caratula: string,
	logo: string
) {
	
	let payload: any = axios.post(config.url + '/course', {
		name,
		description,
		price,
		start,
		end,
		color,
		caratula,
		logo,
	}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'SET_COURSE',
		payload: payload
	}

}

export function uploadCaratula(file: File) {

	var formData = new FormData();

	formData.append('image', file)
	let payload = axios.post(config.url + '/image', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

  return {
		type: 'UPLOAD_CARATULA',
		payload: payload
	}

}

export function uploadLogo(file: File) {

	var formData = new FormData();

	formData.append('image', file)
	let payload = axios.post(config.url + '/image', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

  return {
		type: 'UPLOAD_LOGO',
		payload: payload
	}

}