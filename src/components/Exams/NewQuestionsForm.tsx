import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		formControl: {
			margin: theme.spacing(0),
			width: '100%',
	},
		inputSelect: {
			color:'red',
	
    },
    button: {
        width:"40px",
		height:"40px",
		background:'#5600c2'
    },
    buttonGroup:{
        margin: theme.spacing(1),
        marginTop:'25px'
    }

	}),
);

export default function BasicTextFields(props: any) {

	const classes = useStyles();
	
	var courseList: any[] = []
	var answerList: any[] = []

	if(
		props.answerList !== undefined &&
		Array.isArray(props.answerList) &&
		props.answerList.length > 0
	) {
		answerList = props.answerList
	}

	if(
		props.courseList !== undefined &&
		Array.isArray(props.courseList) &&
		props.courseList.length > 0
	) {
		courseList = props.courseList
	}

	return (
		<form className={classes.root} noValidate autoComplete="off">

			<div className="form-row my-4 align-items-end">
				<div className="col-12 col-lg-6">
					<InputLabel> Añadir pregunta:</InputLabel>
					<TextField value={ props.question } onChange={props.getValue} name='question' id="question" variant="outlined" size="small" fullWidth />
				</div>
				
                <div className="col-12 col-lg-5	">
				<InputLabel> Tipo de pregunta: </InputLabel>
				<FormControl className={classes.formControl} size="small">
				<Select value={ props.questionType } onChange={props.getValue}  name='questionType'  id="questionType" variant="outlined" className={classes.inputSelect}>
			
                    <MenuItem value={'MULTIPLE'}>Múltiple opción</MenuItem>
                    <MenuItem value={'BOOLEAN'}>Verdadero o falso</MenuItem>

				</Select>
				</FormControl>
				</div>
                <div className="col-12 col-lg-1	">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
										startIcon={<AddBox />}
										onClick={props.addQuestion}
                >
                </Button>
				</div>
				</div>
                <div className="form-row my-4 align-items-end">
				<div className="col-12 col-lg-8">
				<InputLabel> Agregar respuesta </InputLabel>
				<TextField value={ props.answer } onChange={props.getValue} name='answer' id="answer" variant="outlined" size="small" fullWidth />
				</div>
				<div className="col-12 col-lg-3">
				<InputLabel> Calificación</InputLabel>
				<TextField value={ props.calification } onChange={props.getValue} name='calification' id="calification" variant="outlined" size="small" fullWidth />
				</div>
				<div className="col-12 col-lg-1">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
										startIcon={<AddBox />}
										onClick={ props.addAnswer }
                >
                </Button>
				</div>
			</div>
			{
				answerList.map((answer: {
					answer: string,
					calification: string
				}) => {
					return <div className="form-row my-4 align-items-end">
						<div className="col-12 col-lg-8">
							<InputLabel> Respuesta</InputLabel>
							<TextField value={ answer.answer } disabled name={ answer.answer } id={ answer.answer } variant="outlined" size="small" fullWidth />
						</div>
						<div className="col-12 col-lg-3">
							<InputLabel> Calificación</InputLabel>
							<TextField value={ answer.calification } disabled name={ answer.answer } id={ answer.answer } variant="outlined" size="small" fullWidth />
						</div>
						<div className="col-12 col-lg-1">
							<Button
								variant="contained"
								color='primary'
								className={classes.button}
								startIcon={<Delete />}
								onClick={ props.addAnswer }
							></Button>
						</div>
					</div>
				})
			}


		</form>
	);
}