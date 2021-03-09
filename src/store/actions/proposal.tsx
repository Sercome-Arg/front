import axios from 'axios';
import config from './config'
import storage from './../../config'

export function setProposal(
	description: string,	
	aceptTC: boolean,
  price: number,
  resource: {
    url: string
  }[]
) {

	let payload: any = axios.post(config.url + '/proposal', {
    description,
    aceptTC,
    price,
    resource
	}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  }) 
	
  return {
		type: 'SET_PROPOSAL',
		payload: payload
	}

}