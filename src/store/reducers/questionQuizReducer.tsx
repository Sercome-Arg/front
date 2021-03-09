export default function questionQuizReducer (state = {

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
    
    case 'GET_QUESTION_ QUIZ_PENDING': {

      return { 
        ...state, 
        fetching: true 
      };

    }
  
    case 'GET_QUESTION_QUIZ_REJECTED': {

      return { 
        ...state, 
        fetching: false, 
        error: action.payload 
      };

    }
  
    case 'GET_QUESTION_QUIZ_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        status: action.payload.data.status,
        message: action.payload.data.message,
        data: action?.payload?.data?.result || {}
      };
    }

    case 'REINTENTAR_QUESTION_QUIZ':{
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
      throw new Error('Este error se manejo asi!' + ' questionQuiz' + 'Reducer.js');
    }

    default: { break; }
  }

  return state;
}