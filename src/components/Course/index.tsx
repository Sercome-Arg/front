import React from 'react';
import CourseNewExport from './Course';
import CoursesFormExport from './CoursesForm';
import DatePickerExport from './DatePicker';
import ColorPickerExport from './ColorPicker';
import CourseExport from './CourseView';
import CourseCardExport from './CourseCard';
import Asd from './asd';

export function CourseCard(props: any) {

  return <CourseCardExport {...props}/>; 
  
}

export function Course(props: any) {

  return <CourseExport {...props}/>; 
  
}

export function CourseNew(props: any) {

  return <CourseNewExport {...props}/>; 
  
}

export function CoursesForm(props: any) {

  return <CoursesFormExport {...props}/>; 
  
}
export function DatePicker(props: any) {

  return <DatePickerExport {...props}/>; 
  
}
export function ColorPicker(props: any) {

  return <ColorPickerExport {...props}/>; 
  
}
