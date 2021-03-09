import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';


import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
	
	}
	}),
);

export default function BasicTextFields(props: any) {
	const classes = useStyles();

	var courseList: any[] = []

	if(
		props.courseList !== undefined &&
		Array.isArray(props.courseList) &&
		props.courseList.length > 0
	) {
		courseList = props.courseList
	}

	return (
		<form className={classes.root} noValidate autoComplete="off">

			<div className="form-row my-4">
				<div className="col-12 col-lg-6">
					<InputLabel> Nombre:</InputLabel>
					<TextField onChange={props.getValue} name='name' id="name" variant="outlined" size="small" fullWidth />
				</div>
				<div className="col-12 col-lg-6">
					<InputLabel> Curso asignado: </InputLabel>
					<FormControl className={classes.formControl} size="small">
						<Select onChange={props.getValue} name='course'  id="course" variant="outlined" className={classes.inputSelect}>
							{
								courseList.map((course: {
									_id: string,
									name: string,
								}) => {
									return <MenuItem value={course._id || ''}>{ course.name || '' } </MenuItem>
								})
							}	
						</Select>
      		</FormControl>
				</div>
			</div>
			<div className="form-row my-4">
				<div className="col-12">
					<InputLabel htmlFor="description">Descripción breve:</InputLabel>
					<TextField
						id="description"
						name='description'
						multiline
						rows={4}
						placeholder='Descripción'
						variant="outlined"
						fullWidth
						onChange={props.getValue}
					/>
				</div>
			</div>
		</form>
	);
}