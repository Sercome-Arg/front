import axios from 'axios';
import config from './config'
import storage from './../../config'

export function processPayment(payment: {
  email: string,
  docType: string,
  docNumber: string,
  installments: string,
  transactionAmount: string,
  paymentMethodId: string,
  description: string,
  token: string,
}) {

	let url: string = config.url + '/payment/process';
	
	let payload: any = axios.post(url, payment, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem(storage.session_token),
      'session': localStorage.getItem(storage.session_id)
    }
  })
	
  return {
		type: 'PROCESS_PAYMENT',
		payload: payload
	}

}

export function reintentar() {

	return {
		type: 'REINTENTAR_MERCADO_PAGO',
		payload: {}
	}

}