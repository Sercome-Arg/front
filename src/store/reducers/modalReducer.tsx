export default function modalReducer (state = {

	openModalOneButton: false,
	openModalTwoButton: false,
	fetching: false,
	fetched: false,
	error: null,

}, action: {
	type: string,
	payload: any
}) {

	switch (action.type) {

		case 'OPEN_ONE_BUTTON' : {

			return { 
				...state, 
				openModalOneButton: true
			};

		}

		case 'CLOSE_ONE_BUTTON' : {

			return { 
				...state,
				openModalOneButton: false
			};

		}

		case 'OPEN_TWO_BUTTON' : {

			return { 
				...state,
				openModalTwoButton: true
			};

		}

		case 'CLOSE_TWO_BUTTON' : {

			return { 
				...state,
				openModalTwoButton: false
			};

		}

		case 'E' : {
			throw new Error('Este error se manejo asi!' + ' modal' + 'Reducer.js');
		}
			
		default : { break; }
			
	}

	return state;

}