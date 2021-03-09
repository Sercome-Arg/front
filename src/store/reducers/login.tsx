export default function LoginReducer (state = {

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

		case 'LOGIN_VERIFIED_PENDING': {

			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'LOGIN_VERIFIED_REJECTED': {

			return { 
				...state, 
				fetching: false, 
				error: action.payload 
			};

		}
	
		case 'LOGIN_VERIFIED_FULFILLED':{
			
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

		case 'LOGIN_WITH_USER_PENDING': {

			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'LOGIN_WITH_USER_REJECTED': {

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
	
		case 'LOGIN_WITH_USER_FULFILLED':{
			
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

		case 'INGRESAR':{
			
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

		case 'INGRESAR_PENDING': {

			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'INGRESAR_REJECTED': {

			return { 
				...state, 
				fetching: false, 
				error: action.payload,
				status: action.payload?.response?.data?.status || '500',
				message: action.payload?.response?.data?.message || 'No se puede realizar la acción, intente mas tarde',
				data: action.payload?.response?.data?.result?.data || ''
			};

		}
	
		case 'INGRESAR_FULFILLED':{
			
			return {
				...state,
				fetching: false,
				fetched: true,
				status: action.payload.data.status,
				message: action.payload.data.message,
				data: action.payload.data.result
			};
		}

		case 'REINTENTAR_LOGIN':{
			return {
				...state,
				fetching: false,
				fetched: false,
				status: 0,
				message: '',
				data: {}
			};
		}

		case 'LOGUEAR':{
			return {
				...state,
				fetching: false,
				fetched: false,
				status: 0,
				message: '',
				data: state.data
			};
		}
	
		case 'E': {
			throw new Error('Este error se manejo asi!' + ' login' + 'Reducer.js');
		}

		default: { break; }
	}

	return state;
}