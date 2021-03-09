import React from 'react';
import SalaExport from './Sala';
import SalasTableExport from './SalasTable'
import SalasFormExport from './SalasForm'
import CourseSelectExport from './CourseSelect'

export function Sala(props: any) {

  return <SalaExport {...props}/>; 
  
}
export function SalasTable(props: any) {

  return <SalasTableExport {...props}/>; 
  
}
export function SalasForm(props: any) {

  return <SalasFormExport {...props}/>; 
  
}
export function CourseSelect(props: any) {

  return <CourseSelectExport {...props}/>; 
  
}