import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AnswersList } from '../Exams'

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        
            padding: '15px',
            marginTop:'35px'

        
    },
}));

export default function ActionsInAccordionSummary() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label="¿Pregunta 1?"
          />
        </AccordionSummary>
        <AccordionDetails>
 
         
          <AnswersList/>

          
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions2-content"
          id="additional-actions2-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label="¿Pregunta 2?"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
          Descripción pregunta 2
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}