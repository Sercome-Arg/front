export default function courseReducer (state = {

		status: 0,
		message: '',
		data: '',
		caratula: '',
		logo: '',
		fetching: false,
		fetched: false,
		error: null,
	
	}, action: {
			type: string,
			payload: any
	}) {
	
		switch (action.type) {
			
			case 'GET_COURSES_BY_STUDENT_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'GET_COURSES_BY_STUDENT_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'GET_COURSES_BY_STUDENT_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					data: action?.payload?.data?.result || []
				};
			}

			case 'GET_COURSE_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'GET_COURSE_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'GET_COURSE_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					data: action?.payload?.data?.result || {}
				};
			}

			case 'GET_COURSES_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'GET_COURSES_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'GET_COURSES_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					data: action?.payload?.data?.result || [] 
				};
			}

			case 'SET_COURSE_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'SET_COURSE_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'SET_COURSE_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					data: action?.payload?.data?.result || {}
				};
			}
	
			case 'UPLOAD_CARATULA_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'UPLOAD_CARATULA_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'UPLOAD_CARATULA_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					caratula: action?.payload?.data?.result || {}
				};
			}
			
			case 'UPLOAD_LOGO_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'UPLOAD_LOGO_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'UPLOAD_LOGO_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					logo: action?.payload?.data?.result || {}
				};
			}

			case 'REINTENTAR_COURSE':{
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
				throw new Error('Este error se manejo asi!' + ' course' + 'Reducer.js');
			}
	
			default: { break; }
		}
	
		return state;
	}