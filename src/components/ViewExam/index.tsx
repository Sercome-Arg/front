import React from 'react';
import ViewExamExport from './ViewExam'
import ViewExamStepperExport from './ViewExamStepper'
import ExamCheckListExport from './ExamCheckList'


export function ViewExam(props: any) {

  return <ViewExamExport {...props}/>; 
  
}
export function ViewExamStepper(props: any) {

  return <ViewExamStepperExport {...props}/>; 
  
}
export function ExamCheckList(props: any) {

  return <ExamCheckListExport {...props}/>; 
  
}
