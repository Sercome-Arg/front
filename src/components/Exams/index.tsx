import React from 'react';
import NewExamExport from './NewExam';
import NewExamFormExport from './NewExamForm';
import NewQuestionsFormExport from './NewQuestionsForm';
import AccordionQuestionExport from './AccordionQuestion';
import AnswersListExport from './AnswersList';
import ExamListExport from './ExamList';
import ExamTableExport from './ExamTable';
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


export function NewExam(props: any) {

  return <NewExamExport {...props} />;

}

export function NewExamForm(props: any) {

  return <NewExamFormExport {...props} />;

}
export function NewQuestionsForm(props: any) {

  return <NewQuestionsFormExport {...props} />;

}
export function AccordionQuestion(props: any) {

  return <AccordionQuestionExport {...props} />;

}
export function AnswersList(props: any) {

  return <AnswersListExport {...props} />;

}

export function ExamList(props: any) {

  const classes = useStyles();

  return <ExamListExport classes={classes} {...props} />;

}

export function ExamTable(props: any) {

  return <ExamTableExport {...props} />;

}


