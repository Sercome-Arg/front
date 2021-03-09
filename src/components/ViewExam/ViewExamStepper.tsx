import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';

import { ExamCheckList } from '../ViewExam'

// STEPPER
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: 'Poppins',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      borderRadius: '35px',
      backgroundColor: '#5600c2',
      color:'white',
      border: '1px solid #5600c2',
      padding:'8px 16px',
      fontFamily: 'Poppins',
      textTransform:'none',
      '&:hover': {
       border: '1px solid #5600c2',
       color: '#5600c2'
      },
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },

    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#5600c2',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#5600c2',
      },
      questions: {
        color:'#383838'
      }
    },
  }),
);

function StyledRadio(props: RadioProps) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function getSteps() {
  return ['Tomi, qué es mejor, JavaScript o PHP?', 'Tomi, qué es mejor, JavaScript o PHP?', 'Tomi, qué es mejor, JavaScript o PHP?'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return (
        <div><ExamCheckList/></div>
      );
    case 1:
      return (
        <div><ExamCheckList/></div>
      );
    case 2:
      return (
        <div><ExamCheckList/></div>
      );
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper(props: any) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  var steps: any[] = [];

  if(props.questionList !== undefined) {
    steps = props.questionList
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((question: {
          question: string,
          answerList: any[]
        }, index: number) => (
          <Step key={question.question}>
            <StepLabel>{'Pregunta n° ' + (index + 1)}</StepLabel>
            <StepContent>
              <Typography>
                <FormControl component="fieldset" className="py-3">
                  <FormLabel component="legend" >{ question.question } </FormLabel>
                  <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios">
                    {
                      question.answerList.map((answer: {
                        answer: string,
                        calification: number
                        
                      }) => {
                        return <FormControlLabel value={ answer.answer } control={<StyledRadio />} label={ answer.answer } />
                      })
                    }
                  </RadioGroup>
                </FormControl>
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>¡Examen finalizado!</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Comenzar de nuevo
          </Button>
        </Paper>
      )}
    </div>
  );
}