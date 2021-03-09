import axios from 'axios'
import config from './config'
import storage from './../../config'

export function getQuizs() {

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
	
	let payload: any = axios.get(config.url + '/quiz' + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_QUIZS',
		payload: payload
	}
}

export function reintentar() {

	return {
		type: 'REINTENTAR_QUIZ',
		payload: {}
	}

}

export function setQuiz(
  name: string,
	description: string,
	course: string,
	questionList: string[]
) {
	
	let payload: any = axios.post(config.url + '/quiz', {
    name,
    description,
		course,
		questionList
	}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'SET_QUIZ',
		payload: payload
	}

}