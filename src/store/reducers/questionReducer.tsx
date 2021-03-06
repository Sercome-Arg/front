export default function questionReducer (state = {

  status: 0,
  message: '',
  data: '',
  fetching: false,
  fetched: false,
  error: null,

}, action: {
    type: string,
    payload: any
}) {

  switch (action.type) {
    
    case 'SET_QUESTION_PENDING': {

      return { 
        ...state, 
        fetching: true 
      };

    }
  
    case 'SET_QUESTION_REJECTED': {

      return { 
        ...state, 
        fetching: false, 
        error: action.payload 
      };

    }
  
    case 'SET_QUESTION_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        status: action.payload.data.status,
        message: action.payload.data.message,
        data: action?.payload?.data?.result || {}
      };
    }

    case 'REINTENTAR_QUESTION':{
      return {
        ...state,
        fetching: false,
        fetched: false,
        status: 0,
        message: '',
        data: {}
      };
    }
  
    case 'E': {
      throw new Error('Este error se manejo asi!' + ' question' + 'Reducer.js');
    }

    default: { break; }
  }

  return state;
}