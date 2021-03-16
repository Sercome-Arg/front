export default function linkReducer (state = {

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

			case 'GET_LINKS_PENDING': {

				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'GET_LINKS_REJECTED': {
	
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
		
			case 'GET_LINKS_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					data: action?.payload?.data?.result || []
				};
			}

			case 'GET_LINK_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'GET_LINK_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'GET_LINK_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
          data: action?.payload?.data?.result || {}
          
				};
			}
			
			case 'GET_LINK_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'GET_LINK_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'GET_LINK_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
          data: action?.payload?.data?.result || {}
          
				};
			}

      case 'GET_LINKS_FOR_COURSE_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'GET_LINKS_FOR_COURSE_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'GET_LINKS_FOR_COURSE_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
          data: action?.payload?.data?.result || []
          
				};
			}

			case 'GET_LINKS_FOR_USER_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'GET_LINKS_FOR_USER_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'GET_LINKS_FOR_USER_FULFILLED': {

        let links: any[] = action?.payload?.data?.result || []
        let linksReturn: any[] = []
        
        links.map((link: {
          course: string,
          courseRef: {
            name: string
          }
        }) => {
          let linkReturn: any = link
          linkReturn.course = link.courseRef.name
          linksReturn.push(linkReturn)
        })

				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					data: linksReturn
				};
			}

			case 'SET_LINK_PENDING': {
	
				return { 
					...state, 
					fetching: true 
				};
	
			}
		
			case 'SET_LINK_REJECTED': {
	
				return { 
					...state, 
					fetching: false, 
					error: action.payload 
				};
	
			}
		
			case 'SET_LINK_FULFILLED': {
				return {
					...state,
					fetching: false,
					fetched: true,
					status: action.payload.data.status,
					message: action.payload.data.message,
					data: action?.payload?.data?.result || {}
				};
			}
	
			case 'REINTENTAR_LINK':{
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
				throw new Error('Este error se manejo asi!' + ' link ' + 'Reducer.js');
			}
	
			default: { break; }
		}
	
		return state;
	}