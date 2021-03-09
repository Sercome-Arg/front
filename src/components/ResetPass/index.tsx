import React from 'react';
import ResetPassExport from './ResetPass'
import NewPassExport from './NewPass'
import ModalErrorExport from './ModalError'

export function ResetPass(props: any) {

	return <ResetPassExport {...props}/>; 
	
}

export function NewPass(props: any) {

	return <NewPassExport {...props}/>; 
	
}

export function ModalError(props: any) {

	return <ModalErrorExport {...props}/>; 
	
}

