export function setImage(image: string) {

	
  return {
		type: 'SET_IMAGE',
		payload: image
	}

}

export function setColor(color: string) {

	
  return {
		type: 'SET_COLOR',
		payload: color
	}

}

export function reintentar() {

	return {
		type: 'REINTENTAR_APP',
		payload: {}
	}

}