export default function studentReducer (state = {

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

			case 'DELETE_STUDENT_PENDING': {
  
        return { 
          ...state, 
          fetching: true 
        };
  
      }
    
      case 'DELETE_STUDENT_REJECTED': {
  
        return { 
          ...state, 
          fetching: false, 
          error: action.payload 
        };
  
      }
    
      case 'DELETE_STUDENT_FULFILLED': {
        return {
          ...state,
          fetching: false,
          fetched: true,
          status: action.payload.data.status,
          message: action.payload.data.message,
          data: action?.payload?.data?.result || {}
        };
			}

      case 'GET_STUDENTS_PENDING': {
  
        return { 
          ...state, 
          fetching: true 
        };
  
      }
    
      case 'GET_STUDENTS_REJECTED': {
  
        return { 
          ...state, 
          fetching: false, 
          error: action.payload 
        };
  
      }
    
      case 'GET_STUDENTS_FULFILLED': {
        return {
          ...state,
          fetching: false,
          fetched: true,
          status: action.payload.data.status,
          message: action.payload.data.message,
          data: action?.payload?.data?.result || [] 
        };
			}

      case 'SET_STUDENT_PENDING': {
  
        return { 
          ...state, 
          fetching: true 
        };
  
      }
    
      case 'SET_STUDENT_REJECTED': {
  
        return { 
          ...state, 
          fetching: false, 
          error: action.payload 
        };
  
      }
    
      case 'SET_STUDENT_FULFILLED': {
        return {
          ...state,
          fetching: false,
          fetched: true,
          status: action.payload.data.status,
          message: action.payload.data.message,
          data: action?.payload?.data?.result || {}
        };
			}
  
      case 'REINTENTAR_STUDENT':{
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
        throw new Error('Este error se manejo asi!' + ' student ' + 'Reducer.js');
      }
  
      default: { break; }
    }
  
    return state;
  }