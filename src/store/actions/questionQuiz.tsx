import axios from 'axios'
import config from './config'
import storage from './../../config'

export function reintentar() {

	return {
		type: 'REINTENTAR_QUESTION_QUIZ',
		payload: {}
	}

}

export function getQuestionQuiz() {
	
	let payload: any = axios.get(config.url + '/questionQuiz', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_QUESTION_QUIZ',
		payload: payload
	}

}