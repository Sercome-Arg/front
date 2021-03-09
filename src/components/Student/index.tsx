import React from 'react';
import StudentExport from './Student';
import StudentListExport from './StudentList';
import StudentFormExport from './StudentForm';
import StudentTableExport from './StudentTable';
import StudentSearchExport from './StudentSearch';

export function StudentSearch(props: any) {

  return <StudentSearchExport {...props}/>; 
  
}

export function StudentTable(props: any) {

  return <StudentTableExport {...props}/>; 
  
}

export function Student(props: any) {

  return <StudentExport {...props}/>; 
  
}

export function StudentList(props: any) {

  return <StudentListExport {...props}/>; 
  
}
export function StudentForm(props: any) {

  return <StudentFormExport {...props}/>; 

  
}

