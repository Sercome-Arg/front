export default function permissionReducer (state = {

	status: 0,
	message: '',
	data: '',
	fetching: false,
	fetched: false,
	error: null 

}, action: {
	type: string,
	payload: any,
}) {

	switch (action.type) {

		case 'GET_PERMISSION_BY_USER_PENDING': {
			
			return {
				...state, 
				fetching: true,
			};

		}
	
		case 'GET_PERMISSION_BY_USER_REJECTED': {

			return { 
				...state, 
				fetching: false, 
				error: action.payload,
			};

		}
	
		case 'GET_PERMISSION_BY_USER_FULFILLED': {

			return {
				...state,
				fetching: false,
				fetched: true,
				status: action.payload.data.status,
				message: action.payload.data.message,
				data: action?.payload?.data?.result?.permissionList || [],
				base: action?.payload?.data?.result?.base || []
			};
		}


		case 'REINTENTAR_PERMISSION':{
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
			throw new Error('Este error se manejo asi!' + ' permission' + 'Reducer.js');
		}

		default: { break; }
	}

	return state;
}