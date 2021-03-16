export default function FileReducer (state = {

	status: 0,
	message: '',
	data: {
		foto: []
	},
	fetching: false,
	fetched: false,
	error: null,

}, action: {
	type: string,
	payload: any
}) {

	switch (action.type) {

    case 'GET_FILE_64_PENDING': {

			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'GET_FILE_64_REJECTED': {

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
	
		case 'GET_FILE_64_FULFILLED': {
			return {
				...state,
				fetching: false,
				fetched: true,
				status: action.payload.data.status,
				message: action.payload.data.message,
				data: action?.payload?.data?.result || {}
			};
		}

		case 'GET_FILE_PENDING': {

			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'GET_FILE_REJECTED': {

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
	
		case 'GET_FILE_FULFILLED': {
			return {
				...state,
				fetching: false,
				fetched: true,
				status: action.payload.data.status,
				message: action.payload.data.message,
				data: action?.payload?.data?.result || {}
			};
		}

		case 'GET_FILES_FOR_COURSE_PENDING': {

			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'GET_FILES_FOR_COURSE_REJECTED': {

			return { 
				...state, 
				fetching: false, 
				error: action.payload 
			};

		}
	
		case 'GET_FILES_FOR_COURSE_FULFILLED': {
			return {
				...state,
				fetching: false,
				fetched: true,
				status: action.payload.data.status,
				message: action.payload.data.message,
				data: action?.payload?.data?.result || {}
			};
		}

		case 'GET_FILES_PENDING': {
	
			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'GET_FILES_REJECTED': {

			return { 
				...state, 
				fetching: false, 
				error: action.payload 
			};

		}
	
		case 'GET_FILES_FULFILLED': {

			let files: any[] = action?.payload?.data?.result || []
			let filesReturn: any[] = []
			
			files.map((file: {
				course: string,
				courseRef: {
					name: string
				}
			}) => {
				let fileReturn: any = file
				fileReturn.course = file?.courseRef?.name || ''
				filesReturn.push(fileReturn)
			})

			return {
				...state,
				fetching: false,
				fetched: true,
				status: action.payload.data.status,
				message: action.payload.data.message,
				data: filesReturn
			};
		}

		case 'SET_FILE_PENDING': {

			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'SET_FILE_REJECTED': {

			return { 
				...state, 
				fetching: false, 
				error: action.payload 
			};

		}
	
		case 'SET_FILE_FULFILLED': {
			return {
				...state,
				fetching: false,
				fetched: true,
				status: action.payload.data.status,
				message: action.payload.data.message,
				data: action?.payload?.data?.result || {}
			};
		}

		case 'UPLOAD_FILE_PENDING': {

			return { 
				...state, 
				fetching: true 
			};

		}
	
		case 'UPLOAD_FILE_REJECTED': {

			return { 
				...state, 
				fetching: false, 
				error: action.payload 
			};

		}
	
		case 'UPLOAD_FILE_FULFILLED': {

			let fotosAux: string[] = []
			if(state?.data?.foto !== undefined) {
				fotosAux = state?.data?.foto || []
			}

			fotosAux.push(action?.payload?.data?.result || '')
			
			return {
				...state,
				fetching: false,
				fetched: true,
				status: action.payload.data.status,
				message: action.payload.data.message,
				data: {
					foto: fotosAux
				},
				foto: fotosAux[0]
			};
		}

		case 'REINTENTAR_FILE':{
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
			throw new Error('Este error se manejo asi!' + ' file' + 'Reducer.js');
		}

		default: { break; }
	}



	return state;
}