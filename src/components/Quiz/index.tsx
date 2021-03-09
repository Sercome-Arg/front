import React from 'react';
import NewQuizExport from './NewQuiz';
import NewQuizFormExport from './NewQuizForm';
import NewQuestionQuizFormExport from './NewQuestionQuizForm';
import AccordionQuestionExport from './AccordionQuestion';
import AnswersListExport from './AnswersList';
import QuizListExport from './QuizList';
import QuizTableExport from './QuizTable';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export function NewQuiz(props: any) {

  return <NewQuizExport {...props}/>; 
  
}

export function NewQuizForm(props: any) {

  return <NewQuizFormExport {...props}/>; 
  
}
export function NewQuestionQuizForm(props: any) {

  return <NewQuestionQuizFormExport {...props}/>; 
  
}
export function AccordionQuestion(props: any) {

  return <AccordionQuestionExport {...props}/>; 
  
}
export function AnswersList(props: any) {

  return <AnswersListExport {...props}/>; 
  
}


export function QuizList(props: any) {

  const classes = useStyles();

  return <QuizListExport classes={classes}  {...props}/>; 
  
}

export function QuizTable(props: any) {

  return <QuizTableExport {...props}/>; 
  
}


