import axios from 'axios'
import config from './config'
import storage from './../../config'

export function reintentar() {

	return {
		type: 'REINTENTAR_QUESTION_TYPE',
		payload: {}
	}

}

export function getQuestionType() {
	
	let payload: any = axios.get(config.url + '/questionType', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'GET_QUESTION_TYPE',
		payload: payload
	}

}