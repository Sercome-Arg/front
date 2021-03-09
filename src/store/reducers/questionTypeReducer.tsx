export default function questionTypeReducer (state = {

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
    
    case 'GET_QUESTION_TYPE_PENDING': {

      return { 
        ...state, 
        fetching: true 
      };

    }
  
    case 'GET_QUESTION_TYPE_REJECTED': {

      return { 
        ...state, 
        fetching: false, 
        error: action.payload 
      };

    }
  
    case 'GET_QUESTION_TYPE_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        status: action.payload.data.status,
        message: action.payload.data.message,
        data: action?.payload?.data?.result || {}
      };
    }

    case 'REINTENTAR_QUESTION_TYPE':{
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
      throw new Error('Este error se manejo asi!' + ' questionType' + 'Reducer.js');
    }

    default: { break; }
  }

  return state;
}