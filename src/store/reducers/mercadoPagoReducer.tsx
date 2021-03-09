export default function itemReducer ( state = {

	status: 0,
  message: '',
  data: {},
  fetching: false,
	fetched: false,
	error: null,
	
}, action: {
	type: string,
	payload: any
}) {

	switch (action.type) {

		case 'PROCESS_PAYMENT_PENDING': {
			return { 
				...state,
				fetching: true,
				message: 'Procesando pago. Esperar un momento.'
			};
		}
	
		case 'PROCESS_PAYMENT_REJECTED': {

			let data: any = action?.payload?.response?.data || {}
      let status: any = action?.payload?.response?.status || 500
      let message: string = action?.payload?.response?.data?.message || ''

      if(status === 500) {
        if(message === '') {
          message = 'Servidor deshabilitado. Reporte el problema a su proveedor de servicio.'
        }
      }

      return { 
        ...state, 
        fetching: false,
        status: status,
        data: data,
        error: action.payload,
        message: message
			};
			
		}
	
		case 'PROCESS_PAYMENT_FULFILLED': {
			return {
        ...state,
        fetching: false,
				fetched: true,
				error: null,
        status: null,
        message: 'Proceso de pago exitoso. Revisa tu lista de pagos.',
        data: action.payload.data
      };
		}

		case 'REINTENTAR_MERCADO_PAGO':{
      return {
        ...state,
        fetching: false,
        fetched: false,
        status: 0,
        message: '',
        data: {}
      };
		}
		
		case 'SETEAR_PAYMENT':{
      return {
        ...state,
        fetching: false,
        fetched: false,
        status: 200,
        message: '',
        data: state.data
      };
    }
	
		case 'E': {
			throw new Error('Este error se manejo asi!' + ' itemReducer' + 'Reducer.js');
		}
		default: {break;}
	}
	return state;
}