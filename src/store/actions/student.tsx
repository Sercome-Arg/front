import axios from 'axios'
import config from './config'
import storage from './../../config'

export function deleteStudent(
	idStudent: string
) {
	
	let payload: any = axios.delete(config.url + '/student/' + idStudent, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'DELETE_STUDENTS',
		payload: payload
	}

}

export function getStudents() {

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
	
	let payload: any = axios.get(config.url + '/student' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_STUDENTS',
		payload: payload
	}

}

export function reintentar() {

	return {
		type: 'REINTENTAR_STUDENT',
		payload: {}
	}

}

export function setStudent(
	name: string,
	user: string,
	pass: string,
	mail: string,
	course: string,
) {
	
	let payload: any = axios.post(config.url + '/student', {
		name,
		user,
		pass,
		mail,
		course,
	}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'SET_STUDENT',
		payload: payload
	}

}
