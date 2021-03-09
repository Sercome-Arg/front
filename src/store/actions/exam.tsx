import axios from 'axios'
import config from './config'
import storage from './../../config'

export function getExam(
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
	
	let payload: any = axios.get(config.url + '/exam' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_EXAM',
		payload: payload
	}
}

export function getExams() {

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
	
	let payload: any = axios.get(config.url + '/exam' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_EXAMS',
		payload: payload
	}
}

export function reintentar() {

	return {
		type: 'REINTENTAR_EXAM',
		payload: {}
	}

}

export function setExam(
  name: string,
  duration: string,
	description: string,
	course: string,
	questionList: any[],
) {
	
	let payload: any = axios.post(config.url + '/exam', {
    name,
    duration: parseInt(duration, 10),
    description,
		course,
		questionList,
	}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'SET_EXAM',
		payload: payload
	}

}