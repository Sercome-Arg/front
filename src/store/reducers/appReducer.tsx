export default function appReducer (state = {

		status: 0,
		message: '',
		data: '',
		color: '',
		image: '',
		fetching: false,
		fetched: false,
		error: null,

	
	}, action: {
		type: string,
		payload: any
	}) {
	
		switch (action.type) {

			case 'REINTENTAR_APP':{
				return {
					...state,
					fetching: false,
					fetched: false,
					status: 0,
					message: '',
					data: {},
					color: '',
					image: ''
				};
			}

			case 'SET_COLOR':{
				return {
					...state,
					color: action.payload,
				};
			}
		
			case 'SET_IMAGE':{
				return {
					...state,
					image: action.payload,
					
				};
			}

			case 'E': {
				throw new Error('Este error se manejo asi!' + ' app ' + 'Reducer.js');
			}
	
			default: { break; }
		}
	
		return state;
	}