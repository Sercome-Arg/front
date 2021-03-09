import React from 'react';
import CoursesListExport from './CoursesList';
import SearchCoursesExport from './SearchCourses';
import CoursesTableExport from './CoursesTable';
import CourseCardExport from './CourseCard';


export function CourseCard(props: any) {

  return <CourseCardExport {...props}/>; 
  
}

export function CoursesList(props: any) {

  return <CoursesListExport {...props}/>; 
  
}
export function SearchCourses(props: any) {

  return <SearchCoursesExport {...props}/>; 
  
}
export function CoursesTable(props: any) {

  return <CoursesTableExport {...props}/>; 
  
}
