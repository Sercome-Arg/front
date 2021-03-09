export default function profileReducer (state = {

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

    case 'GET_PROFILE_PENDING': {

      return { 
        ...state, 
        fetching: true 
      };

    }
  
    case 'GET_PROFILE_REJECTED': {

      return { 
        ...state, 
        fetching: false, 
        error: action.payload,
        status: action.payload?.response?.data?.status || '500',
        message: action.payload?.response?.data?.message || 'No se puede realizar la acción, intente mas tarde',
        data: action.payload?.response?.data?.result?.data || ''
      };

    }
  
    case 'GET_PROFILE_FULFILLED':{
      
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

    case 'REINTENTAR':{
      return {
        ...state,
        fetching: false,
        fetched: false,
        status: 0,
        message: '',
        data: {}
      };
    }

    case 'SETEAR_PROFILE':{
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
      throw new Error('Este error se manejo asi!' + ' profile' + 'Reducer.js');
    }

    default: { break; }
  }

  return state;
}