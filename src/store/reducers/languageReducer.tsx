export default function languageReducer (state = {

  lng: 'es'

}, action: {
	type: string,
	payload: any
}) {

  switch (action.type) {

    case 'CHANGE': {

      return { 
        ...state, 
        lng: action.payload 
      };

    }
  
    case 'E': {
      throw new Error('Este error se manejo asi!' + ' language' + 'Reducer.js');
    }

    default: { break; }
  }

  return state;
}