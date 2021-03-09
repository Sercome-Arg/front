export default function paymentReducer ( state = {

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

		case 'GET_PAYMENT_FOR_USER_PENDING': {
			return { 
				...state, 
				fetching: true 
			};
		}
	
		case 'GET_PAYMENT_FOR_USER_REJECTED': {
			return { 
				...state, 
				fetching: false, 
				error: action.payload 
			};
		}
	
		case 'GET_PAYMENT_FOR_USER_FULFILLED': {
			return {
        ...state,
        fetching: false,
				fetched: true,
				error: null,
        status: action.payload.data.status,
        message: action.payload.data.message,
        data: action.payload.data.result
      };
		}

		case 'REINTENTAR_PAYMENT':{
      return {
        ...state,
        fetching: false,
        fetched: false,
        status: 0,
        message: '',
        data: {}
      };
		}
		
		case 'SETEAR':{
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
			throw new Error('Este error se manejo asi!' + ' paymentReducer' + 'Reducer.js');
		}
		default: {break;}
	}
	return state;
}