import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

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
	var questionList: string[] = []

	if(
		props.courseList !== undefined &&
		Array.isArray(props.courseList) &&
		props.courseList.length > 0
	) {
		courseList = props.courseList
	}

	if(
		props.questionList !== undefined &&
		Array.isArray(props.questionList) &&
		props.questionList.length > 0
	) {
		questionList = props.questionList
	}

	return (
		<form className={classes.root} noValidate autoComplete="off">

			<div className="form-row my-4 align-items-end">
				<div className="col-12 col-lg-11">
					<InputLabel> Añadir pregunta:</InputLabel>
					<TextField value={ props.question } onChange={props.getValue} name='question' id="question" variant="outlined" size="small" fullWidth />
				</div>
				<div className="col-12 col-lg-1	">
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						startIcon={<AddBox />}
						onClick={ props.addQuestion }
					>
					</Button>
				</div>
			</div>
			{
				questionList.map((question: string) => {
					return <div className="form-row my-4 align-items-end">
						<div className="col-12 col-lg-11">
							<TextField disabled value={ question } name='name' id="name" variant="outlined" size="small" fullWidth />
						</div>
						<div className="col-12 col-lg-1">
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								startIcon={<Delete />}
							>
							</Button>
						</div>
					</div>
				})
			}
		</form>
	);
}