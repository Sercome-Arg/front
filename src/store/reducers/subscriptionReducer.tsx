export default function subscriptionReducer ( state = {

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

		case 'SET_VALUES': {
			return {
        ...state,
        fetching: false,
				fetched: true,
				error: null,
        status: 200,
        message: 'Set correct values',
        data: {
					...state.data,
					amount: action.payload.amount,
					description: action.payload.description
				}
      };
		}

		case 'GET_SUBSCRIPTION_PENDING': {
			return { 
				...state, 
				fetching: true 
			};
		}
	
		case 'GET_SUBSCRIPTION_REJECTED': {
			return { 
				...state, 
				fetching: false, 
				error: action.payload 
			};
		}
	
		case 'GET_SUBSCRIPTION_FULFILLED': {
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

		case 'REINTENTAR_SUBSCRIPTION':{
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
			throw new Error('Este error se manejo asi!' + ' subscriptionReducer' + 'Reducer.js');
		}
		default: {break;}
	}
	return state;
}