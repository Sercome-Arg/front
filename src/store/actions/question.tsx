import axios from 'axios'
import config from './config'
import storage from './../../config'

export function reintentar() {

	return {
		type: 'REINTENTAR_QUESTION',
		payload: {}
	}

}

export function setQuestion(
  question: string,
  type: string,
	answer: string,
	course: string
) {
	
	let payload: any = axios.post(config.url + '/question', {
    question,
    type,
    answer,
    course,
	}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'SET_QUESTION',
		payload: payload
	}

}