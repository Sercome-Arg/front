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

export default function ActionsInAccordionSummary(props: any) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{
				props.questionList.map((question: {
					question: string,
					questionType: string,
					answerList: any[]
				}) => {

					let type: string = ''

					if(question.questionType === 'BOOLEAN') type = 'Esta pregunta es de tipo verdadero/falso'
					if(question.questionType === 'MULTIPLE') type = 'Esta pregunta es de tipo multiple choice'

					return <Accordion>
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
								control={<></>}
								label={question.question}
							/>
						</AccordionSummary>
						<AccordionDetails>	
							<AnswersList answerList={ question.answerList } />
						</AccordionDetails>
						<AccordionDetails>	
							<Typography color="textSecondary">
								{ type }
							</Typography>
						</AccordionDetails>
					</Accordion>
				})
			}
			
		</div>
	);
}