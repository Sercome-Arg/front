export default function examReducer (state = {

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

    case 'GET_EXAM_PENDING': {

      return { 
        ...state, 
        fetching: true 
      };

    }
  
    case 'GET_EXAM_REJECTED': {

      return { 
        ...state, 
        fetching: false, 
        error: action.payload 
      };

    }
  
    case 'GET_EXAM_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        status: action.payload.data.status,
        message: action.payload.data.message,
        data: action?.payload?.data?.result || {}
      };
    }

    case 'GET_EXAMS_PENDING': {

      return { 
        ...state, 
        fetching: true 
      };

    }
  
    case 'GET_EXAMS_REJECTED': {

      return { 
        ...state, 
        fetching: false, 
        error: action.payload 
      };

    }
  
    case 'GET_EXAMS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        status: action.payload.data.status,
        message: action.payload.data.message,
        data: action?.payload?.data?.result || []
      };
    }
    
    case 'SET_EXAM_PENDING': {

      return { 
        ...state, 
        fetching: true 
      };

    }
  
    case 'SET_EXAM_REJECTED': {

      return { 
        ...state, 
        fetching: false, 
        error: action.payload 
      };

    }
  
    case 'SET_EXAM_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        status: action.payload.data.status,
        message: action.payload.data.message,
        data: action?.payload?.data?.result || {}
      };
    }

    case 'REINTENTAR_EXAM':{
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
      throw new Error('Este error se manejo asi!' + ' exam' + 'Reducer.js');
    }

    default: { break; }
  }

  return state;
}