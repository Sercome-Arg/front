import React from 'react';
import NotFoundExport from './NotFound'
import Error403Export from './Error403'

export function NotFound(props: any) {

  return <NotFoundExport {...props}/>; 
  
}
export function Error403(props: any) {

  return <Error403Export {...props}/>; 
  
}